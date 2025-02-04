using System.Text.Json;
using System.Text.Json.Serialization;
using BrandonWilliamsCs.EuchreNight.Domain.Common;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Serialization;

public class ValueMapJsonConverter<TKey, TValue> : JsonConverter<ValueMap<TKey, TValue>> where TKey : IComparable<TKey>
{
  // Serialize a value map just like a regular dictionary
  private readonly JsonConverter<Dictionary<TKey, TValue>> dictConverter;
  private readonly Type dictType = typeof(Dictionary<TKey, TValue>);

  public ValueMapJsonConverter(JsonSerializerOptions options)
  {
    dictConverter = (JsonConverter<Dictionary<TKey, TValue>>)options.GetConverter(dictType);
  }

  public override ValueMap<TKey, TValue> Read(
      ref Utf8JsonReader reader,
      Type typeToConvert,
      JsonSerializerOptions options) => new(dictConverter.Read(ref reader, dictType, options)!);

  public override void Write(
    Utf8JsonWriter writer,
    ValueMap<TKey, TValue> value,
    JsonSerializerOptions options) =>
        dictConverter.Write(writer, value.ToDictionary(), options);
}
