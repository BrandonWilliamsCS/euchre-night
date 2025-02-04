using BrandonWilliamsCs.EuchreNight.Domain.Common;

namespace BrandonWilliamsCs.EuchreNight.Domain;

public class HandReport(Guid uniqueId) : Entity(uniqueId)
{
  public required string SessionId { get; set; }
  public required int RoundNumber { get; set; }
  public required int TableNumber { get; set; }
  public required int HandNumber { get; set; }
  public required int CallingPlayerNumber { get; set; }
  public required bool CallerWentAlone { get; set; }
  public required IList<int> WinningPlayerNumbers { get; set; }
  public required bool WinnersTookAllTricks { get; set; }

  public bool IsEuchre => !WinningPlayerNumbers.Contains(CallingPlayerNumber);

  public int WinningScore => IsEuchre ? 2 : !WinnersTookAllTricks ? 1 : CallerWentAlone ? 4 : 2;

  public HandOutcome ComputeOutcome()
  {
    var isEuchre = IsEuchre;
    var winningScore = WinningScore;
    return new(
      // The caller may or may not be a winner, so account for all of them but don't repeat
      new ValueMap<int, HandOutcome.PlayerScore>(WinningPlayerNumbers.Append(CallingPlayerNumber).Distinct().Select(playerNumber =>
      {
        var isWinner = WinningPlayerNumbers.Contains(playerNumber);
        var lonerAttempts = CallerWentAlone && playerNumber == CallingPlayerNumber ? 1 : 0;
        var score = new HandOutcome.PlayerScore
        (
          Win: isWinner,
          Points: isWinner ? winningScore : 0,
          Euchres: isWinner && isEuchre ? 1 : 0,
          LonersAttempted: lonerAttempts,
          LonersWon: isWinner && WinnersTookAllTricks ? lonerAttempts : 0

        );
        return new KeyValuePair<int, HandOutcome.PlayerScore>(playerNumber, score);
      })));
  }
}
