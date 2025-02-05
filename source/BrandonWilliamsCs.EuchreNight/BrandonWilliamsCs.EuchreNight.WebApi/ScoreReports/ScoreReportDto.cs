using BrandonWilliamsCs.EuchreNight.Domain;

namespace BrandonWilliamsCs.EuchreNight.WebApi.ScoreReports;

public class ScoreReportDto
{
  public required Guid UniqueId { get; set; }
  public required Guid SessionId { get; set; }
  public required IList<GameOutcomeDto> Games { get; set; }

  public class GameOutcomeDto
  {
    public required int RoundNumber { get; set; }
    public required int TableNumber { get; set; }
    public required GameOutcome GameOutcome { get; set; }
  }
}