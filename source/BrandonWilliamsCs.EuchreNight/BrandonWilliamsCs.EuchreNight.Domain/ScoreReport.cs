using BrandonWilliamsCs.EuchreNight.Domain.Common;

namespace BrandonWilliamsCs.EuchreNight.Domain;

public class ScoreReport(Guid uniqueId,
  Guid sessionId) : Entity(uniqueId)
{
  public Guid SessionId { get; private set; } = sessionId;

  public ValueMap<(int Round, int Table), GameOutcome> Games { get; private set; } = new([]);

  public void IncludeHand(HandReport hand)
  {
    var key = (hand.RoundNumber, hand.TableNumber);
    var gameSoFar = Games.TryGetValue(key, out var existing) ? existing : GameOutcome.Empty;
    Games = Games.Set(key, gameSoFar.IncludeHand(hand.HandNumber, hand.ComputeOutcome()));
  }

  public void IncludeGame(int roundNumber, int tableNumber, GameOutcome game)
  {
    // TODO: What about repeat round+table? Forbid, overwrite, merge?
    var key = (roundNumber, tableNumber);
    Games = Games.Set(key, game);
  }

  public static ScoreReport New(Guid sessionId) =>
    new(Guid.NewGuid(), sessionId);
}
