using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.CosmosDb.Access;
using BrandonWilliamsCs.EuchreNight.Data;
using BrandonWilliamsCs.EuchreNight.Data.Document;
using BrandonWilliamsCs.EuchreNight.Domain;
using BrandonWilliamsCs.EuchreNight.Domain.RoundRobin;
using BrandonWilliamsCs.EuchreNight.WebApi.Mapping;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Sessions;

public static class SessionEndpoints
{
  public static readonly string[] StandardTables = ["Table 1", "Table 2", "Table 3"];

  public static void RegisterSessionEndpoints(this WebApplication app)
  {
    var endpointGroup = app.MapGroup("/Sessions").WithOpenApi();
    endpointGroup.MapGet("/Current", GetCurrentSession).WithName(nameof(GetCurrentSession));
    endpointGroup.MapPost("/StartNew", StartNewSession).WithName(nameof(StartNewSession));
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

  static async Task<IResult> StartNewSession(StartNewSessionDto dto, IContainerAccess containerAccess)
    {
        if (!IndividualRoundRobinGameStructure.StandardGameStructures.TryGetValue(dto.Players.Count, out var gameStructure))
        {
            throw new NotSupportedException("Can only create a session for 12 or 13 players.");
        }

        Dictionary<int, Player> playerMappings = await GetPlayerMappingsFromTerms(dto.Players, containerAccess);
        var session = Session.New(dto.Description, dto.StartTime, playerMappings, new SessionPlan(StandardTables, gameStructure));
        await SaveSession(containerAccess, session);
        return TypedResults.Ok();
    }

    private static async Task<Dictionary<int, Player>> GetPlayerMappingsFromTerms(IList<string> playerTerms, IContainerAccess containerAccess)
    {
        const string playerTermsParam = "playerTerms";
        var playerReader = containerAccess.ReadContainer(ContainerSpecifications.Player);
        var playerDocs = await playerReader.Query(new QueryDefinitionBuilder()
            .AddFilterCondition($"ARRAY_CONTAINS(@{playerTermsParam}, c.player.uniqueId) or ARRAY_CONTAINS(@{playerTermsParam}, c.player.displayName)")
            .AddParameter(playerTermsParam, playerTerms)
            .Build(),
          (PartitionKey?)null).ToListAsync();
        var playerMappings = playerTerms
          .Select(playerTerm => playerDocs.Single(playerDoc => playerDoc.Player.UniqueId.ToString() == playerTerm || playerDoc.Player.DisplayName == playerTerm))
          .Select((playerDoc, i) => (playerDoc.Player, PlayerNumber: i + 1))
          .ToDictionary(pair => pair.PlayerNumber, pair => pair.Player);
        return playerMappings;
    }

    private static async Task SaveSession(IContainerAccess containerAccess, Session session)
    {
        var sessionDm = MapToDm.MapToSessionDm(session);
        var sessionWriter = containerAccess.WriteContainer(ContainerSpecifications.Session);
        var SessionDoc = new SessionDocument(session.UniqueId.ToString(), sessionDm);
        await sessionWriter.Create(SessionDoc);
    }
}