using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.EuchreNight.Domain;

namespace BrandonWilliamsCs.EuchreNight.Data.Document
{
  public class ScoreReportDocument(ScoreReportDocument.ScoreReportDm scoreReport) : CosmosDbDocument(scoreReport.UniqueId.ToString())
  {
    public Guid SessionId => ScoreReport.SessionId;
    public ScoreReportDm ScoreReport { get; } = scoreReport;

    public class ScoreReportDm
    {
      public required Guid UniqueId { get; set; }
      public required Guid SessionId { get; set; }
      public required IList<GameOutcomeDm> Games { get; set; }
    }

    public class GameOutcomeDm
    {
      public required int RoundNumber { get; set; }
      public required int TableNumber { get; set; }
      public required GameOutcome GameOutcome { get; set; }
    }
  }
}
