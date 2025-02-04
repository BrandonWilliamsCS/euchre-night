using BrandonWilliamsCs.EuchreNight.Domain.Common;

namespace BrandonWilliamsCs.EuchreNight.Domain;

public record HandOutcome(ValueMap<int, HandOutcome.PlayerScore> PlayerScores)
{
  public static readonly HandOutcome Empty = new(ValueMap<int, PlayerScore>.Empty);
  
  public record PlayerScore(bool Win, int Points, int Euchres, int LonersAttempted, int LonersWon)
  {
    public static readonly PlayerScore Empty = new(false, 0, 0, 0, 0);
  }
}
