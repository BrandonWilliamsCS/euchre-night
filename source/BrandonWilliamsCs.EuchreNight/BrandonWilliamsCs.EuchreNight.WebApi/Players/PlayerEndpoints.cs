using BrandonWilliamsCs.EuchreNight.Domain;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Players;

public static class PlayerEndpoints
{
  private static List<Player> players =
  [
    new Player
    {
      UniqueId = Guid.NewGuid(),
      DisplayName = "Example Player",
      PreferredColor = "0000FF",
    }
  ];

  public static void RegisterPlayerEndpoints(this WebApplication app)
  {
    var endpointGroup = app.MapGroup("/players").WithOpenApi();
    endpointGroup.MapGet("/", GetPlayers).WithName(nameof(GetPlayers));
    endpointGroup.MapPut("/", AddPlayer).WithName(nameof(AddPlayer));
  }

  static Ok<IEnumerable<Player>> GetPlayers()
  {
    return TypedResults.Ok(players.AsEnumerable());
  }

  static Ok<Player> AddPlayer(AddPlayerDto dto)
  {
    var player = new Player
    {
      UniqueId = Guid.NewGuid(),
      DisplayName = dto.DisplayName,
      PreferredColor = dto.PreferredColor,
    };
    players.Add(player);
    return TypedResults.Ok(player);
  }
}