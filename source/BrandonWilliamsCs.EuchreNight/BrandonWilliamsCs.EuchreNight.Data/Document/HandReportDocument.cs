using BrandonWilliamsCs.CosmosDb;

namespace BrandonWilliamsCs.EuchreNight.Data.Document
{
  public class HandReportDocument(HandReportDocument.HandReportDm handReport) : CosmosDbDocument(handReport.UniqueId.ToString())
  {
    public HandReportDm HandReport { get; } = handReport;

    public class HandReportDm
    {
      public required Guid UniqueId { get; set; }
      public required string SessionId { get; set; }
      public required int RoundNumber { get; set; }
      public required int TableNumber { get; set; }
      public required int CallingPlayerNumber { get; set; }
      public required bool CallerWentAlone { get; set; }
      public required int WinningTeamNumber { get; set; }
      public required bool WinnersTookAllTricks { get; set; }
    }
  }
}
