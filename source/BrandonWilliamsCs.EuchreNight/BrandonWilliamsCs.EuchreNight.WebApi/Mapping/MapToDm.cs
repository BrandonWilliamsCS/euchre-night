using BrandonWilliamsCs.EuchreNight.Data.Document;
using BrandonWilliamsCs.EuchreNight.Domain;
using BrandonWilliamsCs.EuchreNight.Domain.RoundRobin;
using BrandonWilliamsCs.EuchreNight.WebApi.HandReports;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Mapping;

public static class MapToDm
{

  #region Session
  public static SessionDocument.SessionDm MapToSessionDm(Session dto) => new()
  {
    UniqueId = dto.UniqueId,
    Description = dto.Description,
    StartTime = dto.StartTime,
    PlayerMappings = dto.PlayerMappings.ToDictionary((pair) => pair.Key, pair => MapToSessionPlayerDm(pair.Value)).AsReadOnly(),
    SessionPlan = MapToSessionSessionPlanDm(dto.SessionPlan),
  };

  public static SessionDocument.PlayerDm MapToSessionPlayerDm(Player dto) => new()
  {
    UniqueId = dto.UniqueId,
    DisplayName = dto.DisplayName,
  };

  public static SessionDocument.SessionPlanDm MapToSessionSessionPlanDm(SessionPlan dto) => new()
  {
    Tables = dto.Tables,
    GameStructure = MapToSessionGameStructureDm(dto.GameStructure),
  };

  public static SessionDocument.GameStructureDm MapToSessionGameStructureDm(IndividualRoundRobinGameStructure dto) => new()
  {
    Rounds = dto.Rounds.Select(MapToSessionRoundDm).ToList(),
  };

  public static SessionDocument.RoundDm MapToSessionRoundDm(Round dto) => new()
  {
    Games = dto.Games.Select(MapToSessionPlannedGameDm).ToList(),
    FreePlayers = dto.FreePlayers,
  };

  public static SessionDocument.PlannedGameDm MapToSessionPlannedGameDm(PlannedGame dto) => new()
  {
    Table = dto.Table,
    Participants = dto.Participants,
  };
  #endregion

  #region HandReport

  public static HandReportDocument.HandReportDm MapToHandReportDm(PlaceHandReportDto dto, Guid uniqueId) => new()
  {
    UniqueId = uniqueId,
    SessionId = dto.SessionId,
    RoundNumber = dto.RoundNumber,
    TableNumber = dto.TableNumber,
    CallingPlayerNumber = dto.CallingPlayerNumber,
    CallerWentAlone = dto.CallerWentAlone,
    WinningTeamNumber = dto.WinningTeamNumber,
    WinnersTookAllTricks = dto.WinnersTookAllTricks,
  };
  #endregion
}
