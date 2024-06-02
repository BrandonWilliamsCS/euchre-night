using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.CosmosDb.Access;
using BrandonWilliamsCs.EuchreNight.Data;
using BrandonWilliamsCs.EuchreNight.Data.Document;
using BrandonWilliamsCs.EuchreNight.Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Players;

public static class PlayerEndpoints
{
  public static void RegisterPlayerEndpoints(this WebApplication app)
  {
    var endpointGroup = app.MapGroup("/players").WithOpenApi();
    endpointGroup.MapGet("/", GetPlayers).WithName(nameof(GetPlayers));
    endpointGroup.MapPut("/", AddPlayer).WithName(nameof(AddPlayer));
  }

  static Ok<IAsyncEnumerable<Player>> GetPlayers(IContainerAccess containerAccess)
  {
    var playerContainer = ContainerSpecifications.Player;
    var reader = containerAccess.ReadContainer(playerContainer);
    var playerDocs = reader.Query(QueryDefinitionBuilder.QueryAll, (PartitionKey?)null);
    var players = playerDocs.Select(doc => doc.Player);
    return TypedResults.Ok(players);
  }

  static async Task<Ok<Player>> AddPlayer(AddPlayerDto dto, IContainerAccess containerAccess)
  {
    var player = new Player
    {
      UniqueId = Guid.NewGuid(),
      DisplayName = dto.DisplayName,
      PreferredColor = dto.PreferredColor,
    };

    var playerContainer = ContainerSpecifications.Player;
    var writer = containerAccess.WriteContainer(playerContainer);
    var playerDoc = new PlayerDocument(player.UniqueId.ToString(), player);
    await writer.Create(playerDoc);
    return TypedResults.Ok(player);
  }
}