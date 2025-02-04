using BrandonWilliamsCs.EuchreNight.Domain.Common;

namespace BrandonWilliamsCs.EuchreNight.Domain;

public record GameOutcome(IList<HandOutcome> Hands)
{
  public static readonly GameOutcome Empty = new([]);

  public ValueMap<int, PlayerScore> PlayerScores { get; } = PlayerScore.Compute(Hands);

  public GameOutcome IncludeHand(int handNumber, HandOutcome hand)
  {
    var newHands = Hands.ToList();
    // Pad the hands list with empty outcomes if needed, so we can simply overwrite the target hand
    while (newHands.Count < handNumber)
    {
      newHands.Add(HandOutcome.Empty);
    }
    newHands[handNumber - 1] = hand;
    return new(newHands);
  }

  public record PlayerScore(bool Win, int HandsWon, int Points, int Euchres, int LonersAttempted, int LonersWon)
  {
    // TODO: "Win" is kind of an awkward value because it only makes sense in the context of a full set of players.

    public static readonly PlayerScore Empty = new(false, 0, 0, 0, 0, 0);

    private PlayerScore IncludeHand(HandOutcome.PlayerScore other) => this with
    {
      HandsWon = this.HandsWon + (other.Win ? 1 : 0),
      Points = this.Points + other.Points,
      Euchres = this.Euchres + other.Euchres,
      LonersAttempted = this.LonersAttempted + other.LonersAttempted,
      LonersWon = this.LonersWon + other.LonersWon,
    };

    public static ValueMap<int, PlayerScore> Compute(IList<HandOutcome> Hands)
    {
      if (!Hands.Any()) { return ValueMap<int, PlayerScore>.Empty; }
      var rawDict = new Dictionary<int, PlayerScore>();
      foreach (var (playerNumber, handScore) in Hands.SelectMany(hand => hand.PlayerScores))
      {
        var priorScore = rawDict.TryGetValue(playerNumber, out var existingPriorScore) ? existingPriorScore : Empty;
        rawDict[playerNumber] = priorScore.IncludeHand(handScore);
      }
      var topScore = rawDict.Values.Max(playerScore => playerScore.Points);
      var playersWithTopScore = rawDict
        .Where(playerPair => playerPair.Value.Points == topScore)
        .Select(playerPair => playerPair.Key)
        .ToList();
      // TODO: if not using a 2v2 structure, wins may have to be computed differently.
      if (playersWithTopScore.Count == 2)
      {
        foreach (var winnerNumber in playersWithTopScore)
        {
          rawDict[winnerNumber] = rawDict[winnerNumber] with { Win = true };
        }
      }
      return new(rawDict);
    }
  }
}
