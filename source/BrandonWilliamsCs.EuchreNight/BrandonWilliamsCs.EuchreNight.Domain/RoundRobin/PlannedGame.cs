namespace BrandonWilliamsCs.EuchreNight.Domain.RoundRobin;

public class PlannedGame
{
  public required int Table { get; set; }
  public required Participants<int> Participants { get; set; }
}
