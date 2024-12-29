namespace BrandonWilliamsCs.EuchreNight.Domain.RoundRobin;

public class Round
{
  public required IList<PlannedGame> Games { get; set; }
  public required IList<int> FreePlayers { get; set; }

}
