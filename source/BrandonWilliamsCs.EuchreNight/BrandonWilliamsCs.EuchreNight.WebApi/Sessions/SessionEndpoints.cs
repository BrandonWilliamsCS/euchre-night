using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.CosmosDb.Access;
using BrandonWilliamsCs.EuchreNight.Data;
using BrandonWilliamsCs.EuchreNight.WebApi.Mapping;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Sessions;

public static class SessionEndpoints
{
  public static void RegisterSessionEndpoints(this WebApplication app)
  {
    var endpointGroup = app.MapGroup("/Sessions").WithOpenApi();
    endpointGroup.MapGet("/Current", GetCurrentSession).WithName(nameof(GetCurrentSession));
  }

  static async Task<IResult> GetCurrentSession(IContainerAccess containerAccess)
  {
    var sessionContainer = ContainerSpecifications.Session;
    var reader = containerAccess.ReadContainer(sessionContainer);
    var latestSessionDoc = await reader.QueryOne(new QueryDefinitionBuilder()
        .AddOrder("c.session.startTime", desc: true)
        .SetLimitAndOffset(1)
        .Build(),
      (PartitionKey?)null);

    if (latestSessionDoc is null)
    {
      return TypedResults.NotFound();
    }

    return TypedResults.Ok(MapToDto.MapToSessionDto(latestSessionDoc));
  }

}