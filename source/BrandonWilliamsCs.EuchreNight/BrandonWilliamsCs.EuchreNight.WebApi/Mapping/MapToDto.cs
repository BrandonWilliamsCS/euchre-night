using BrandonWilliamsCs.EuchreNight.Data.Document;
using BrandonWilliamsCs.EuchreNight.WebApi.ScoreReports;
using BrandonWilliamsCs.EuchreNight.WebApi.Sessions;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Mapping;

public static class MapToDto
{
  #region Session
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
  #endregion

  #region ScoreReport
  public static ScoreReportDto MapToScoreReportDto(ScoreReportDocument document) => MapToScoreReportDto(document.ScoreReport);

  public static ScoreReportDto MapToScoreReportDto(ScoreReportDocument.ScoreReportDm dm) => new()
  {
    UniqueId = dm.UniqueId,
    SessionId = dm.SessionId,
    Games = dm.Games.Select(MapToScoreReportGameOutcomeDto).ToList(),
  };

  public static ScoreReportDto.GameOutcomeDto MapToScoreReportGameOutcomeDto(ScoreReportDocument.GameOutcomeDm dm) => new()
  {
    RoundNumber = dm.RoundNumber,
    TableNumber = dm.TableNumber,
    GameOutcome = dm.GameOutcome,
  };
  #endregion
}
