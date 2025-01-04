using BrandonWilliamsCs.EuchreNight.Data.Document;
using BrandonWilliamsCs.EuchreNight.WebApi.Sessions;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Mapping;

public static class MapToDto
{
  public static SessionDto MapToSessionDto(SessionDocument document) => MapToSessionDto(document.Session);

  public static SessionDto MapToSessionDto(SessionDocument.SessionDm dm) => new()
  {
    UniqueId = dm.UniqueId,
    Description = dm.Description,
    StartTime = dm.StartTime,
    PlayerMappings = dm.PlayerMappings.ToDictionary((pair) => pair.Key, pair => MapToSessionPlayerDto(pair.Value)).AsReadOnly(),
    SessionPlan = MapToSessionSessionPlanDto(dm.SessionPlan),
  };

  public static SessionDto.PlayerDto MapToSessionPlayerDto(SessionDocument.PlayerDm dm) => new()
  {
    UniqueId = dm.UniqueId,
    DisplayName = dm.DisplayName,
  };

  public static SessionDto.SessionPlanDto MapToSessionSessionPlanDto(SessionDocument.SessionPlanDm dm) => new()
  {
    Tables = dm.Tables,
    GameStructure = MapToSessionGameStructureDto(dm.GameStructure),
  };

  public static SessionDto.GameStructureDto MapToSessionGameStructureDto(SessionDocument.GameStructureDm dm) => new()
  {
    Rounds = dm.Rounds.Select(MapToSessionRoundDto).ToList(),
  };

  public static SessionDto.RoundDto MapToSessionRoundDto(SessionDocument.RoundDm dm) => new()
  {
    Games = dm.Games.Select(MapToSessionPlannedGameDto).ToList(),
    FreePlayers = dm.FreePlayers,
  };

  public static SessionDto.PlannedGameDto MapToSessionPlannedGameDto(SessionDocument.PlannedGameDm dm) => new()
  {
    Table = dm.Table,
    Participants = dm.Participants,
  };
}
