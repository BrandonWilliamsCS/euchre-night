using BrandonWilliamsCs.EuchreNight.Data.Document;
using BrandonWilliamsCs.EuchreNight.Domain;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Mapping;

public static class MapToDomain
{

  #region HandReport
  public static HandReport MapToHandReport(HandReportDocument doc) => MapToHandReport(doc.HandReport);
  public static HandReport MapToHandReport(HandReportDocument.HandReportDm dm) => new(dm.UniqueId)
  {
    SessionId = dm.SessionId,
    RoundNumber = dm.RoundNumber,
    TableNumber = dm.TableNumber,
    HandNumber = dm.HandNumber,
    CallingPlayerNumber = dm.CallingPlayerNumber,
    CallerWentAlone = dm.CallerWentAlone,
    WinningPlayerNumbers = dm.WinningPlayerNumbers,
    WinnersTookAllTricks = dm.WinnersTookAllTricks,
  };
  #endregion

  #region ScoreReport
  public static ScoreReport MapToScoreReport(ScoreReportDocument? doc, Guid sessionId) => doc is not null
    ? MapToScoreReport(doc.ScoreReport)
    : ScoreReport.New(sessionId);
  public static ScoreReport MapToScoreReport(ScoreReportDocument.ScoreReportDm dm)
  {
    var scoreReport = new ScoreReport(dm.UniqueId, dm.SessionId);
    foreach (var game in dm.Games)
    {
      scoreReport.IncludeGame(game.RoundNumber, game.TableNumber, game.GameOutcome);
    }
    return scoreReport;
  }
  #endregion
}
