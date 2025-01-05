namespace BrandonWilliamsCs.EuchreNight.WebApi.HandReports;

public class PlaceHandReportDto
{
  public required string SessionId { get; set; }
  public required int RoundNumber { get; set; }
  public required int TableNumber { get; set; }
  public required int CallingPlayerNumber { get; set; }
  public required bool CallerWentAlone { get; set; }
  public required int WinningTeamNumber { get; set; }
  public required bool WinnersTookAllTricks { get; set; }
}