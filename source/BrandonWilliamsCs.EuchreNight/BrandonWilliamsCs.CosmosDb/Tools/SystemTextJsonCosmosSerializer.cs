using System;
using System.IO;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Azure.Core.Serialization;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb.Tools
{

    /// <summary>
    /// Uses System.Text.Json to serialize/deserialize CosmosDb documents and member names.
    /// </summary>
    /// <remarks>
    /// Adapted from the
    /// <see href="https://github.com/Azure/azure-cosmos-dotnet-v3/blob/61319986f14e3a077a830e97b0b8b5692effec8c/Microsoft.Azure.Cosmos.Samples/Usage/SystemTextJson/CosmosSystemTextJsonSerializer.cs">
    ///     example in the library project
    /// </see>
    /// </remarks>
    public class SystemTextJsonCosmosSerializer : CosmosLinqSerializer
    {
        private readonly JsonObjectSerializer systemTextJsonSerializer;
        private readonly JsonSerializerOptions? jsonSerializerOptions;

        public SystemTextJsonCosmosSerializer(JsonSerializerOptions jsonSerializerOptions)
        {
            systemTextJsonSerializer = new JsonObjectSerializer(jsonSerializerOptions);
            this.jsonSerializerOptions = jsonSerializerOptions;
        }

        public override T FromStream<T>(Stream stream)
        {
            using (stream)
            {
                if (stream.CanSeek && stream.Length == 0)
                {
                    throw new InvalidDataException("Unable to deserialize empty stream");
                }

                if (typeof(Stream).IsAssignableFrom(typeof(T)))
                {
                    return (T)(object)stream;
                }

                var result = systemTextJsonSerializer.Deserialize(stream, typeof(T), default);
                if (result is null)
                {
                    throw new ArgumentException("Stream does not represent a deserializable object", nameof(stream));
                }
                return (T)result;
            }
        }

        public override Stream ToStream<T>(T input)
        {
            MemoryStream streamPayload = new MemoryStream();
            systemTextJsonSerializer.Serialize(streamPayload, input, input.GetType(), default);
            streamPayload.Position = 0;
            return streamPayload;
        }

        public override string SerializeMemberName(MemberInfo memberInfo)
        {
            var jsonPropertyNameAttribute = memberInfo.GetCustomAttribute<JsonPropertyNameAttribute>(true);
            if (!string.IsNullOrEmpty(jsonPropertyNameAttribute?.Name))
            {
                return jsonPropertyNameAttribute.Name;
            }

            if (jsonSerializerOptions?.PropertyNamingPolicy != null)
            {
                return jsonSerializerOptions.PropertyNamingPolicy.ConvertName(memberInfo.Name);
            }

            return memberInfo.Name;
        }
    }
}