using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using BrandonWilliamsCs.EuchreNight.Domain.Common;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Serialization;

public class ValueMapJsonConverterFactory : JsonConverterFactory
{
  public override bool CanConvert(Type typeToConvert) => typeToConvert.IsGenericType
      && typeToConvert.GetGenericTypeDefinition() == typeof(ValueMap<,>);

  public override JsonConverter CreateConverter(
      Type type,
      JsonSerializerOptions options)
  {
    Type[] typeArguments = type.GetGenericArguments();
    Type keyType = typeArguments[0];
    Type valueType = typeArguments[1];

    JsonConverter converter = (JsonConverter)Activator.CreateInstance(
        typeof(ValueMapJsonConverter<,>).MakeGenericType(
            [keyType, valueType]),
        BindingFlags.Instance | BindingFlags.Public,
        binder: null,
        args: [options],
        culture: null)!;

    return converter;
  }
}