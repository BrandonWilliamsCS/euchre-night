namespace BrandonWilliamsCs.EuchreNight.Domain.RoundRobin;

public class IndividualRoundRobinGameStructure
{
  public static readonly IDictionary<int, IndividualRoundRobinGameStructure> StandardGameStructures = new Dictionary<int, IndividualRoundRobinGameStructure>
  {
    {12, new() { Rounds =
      [
        BuildRound([ 1,  2,  7, 11,  4,  5,  3,  8,  6,  9, 10, 12]),
        BuildRound([ 1,  3,  8, 12,  5,  6,  4,  9,  7, 10, 11,  2]),
        BuildRound([ 1,  4,  9,  2,  6,  7,  5, 10,  8, 11, 12,  3]),
        BuildRound([ 1,  5, 10,  3,  7,  8,  6, 11,  9, 12,  2,  4]),
        BuildRound([ 1,  6, 11,  4,  8,  9,  7, 12, 10,  2,  3,  5]),
        BuildRound([ 1,  7, 12,  5,  9, 10,  8,  2, 11,  3,  4,  6]),
        BuildRound([ 1,  8,  2,  6, 10, 11,  9,  3, 12,  4,  5,  7]),
        BuildRound([ 1,  9,  3,  7, 11, 12, 10,  4,  2,  5,  6,  8]),
        BuildRound([ 1, 10,  4,  8, 12,  2, 11,  5,  3,  6,  7,  9]),
        BuildRound([ 1, 11,  5,  9,  2,  3, 12,  6,  4,  7,  8, 10]),
        BuildRound([ 1, 12,  6, 10,  3,  4,  2,  7,  5,  8,  9, 11]),
      ]}},
    {13, new() { Rounds =
      [
        BuildRound([ 5,  6,  4, 10,  7,  9, 12,  3, 11,  1,  8, 13,  2]),
        BuildRound([ 6,  7,  5, 11,  8, 10, 13,  4, 12,  2,  9,  1,  3]),
        BuildRound([ 7,  8,  6, 12,  9, 11,  1,  5, 13,  3, 10,  2,  4]),
        BuildRound([ 8,  9,  7, 13, 10, 12,  2,  6,  1,  4, 11,  3,  5]),
        BuildRound([ 9, 10,  8,  1, 11, 13,  3,  7,  2,  5, 12,  4,  6]),
        BuildRound([10, 11,  9,  2, 12,  1,  4,  8,  3,  6, 13,  5,  7]),
        BuildRound([11, 12, 10,  3, 13,  2,  5,  9,  4,  7,  1,  6,  8]),
        BuildRound([12, 13, 11,  4,  1,  3,  6, 10,  5,  8,  2,  7,  9]),
        BuildRound([13,  1, 12,  5,  2,  4,  7, 11,  6,  9,  3,  8, 10]),
        BuildRound([ 1,  2, 13,  6,  3,  5,  8, 12,  7, 10,  4,  9, 11]),
        BuildRound([ 2,  3,  1,  7,  4,  6,  9, 13,  8, 11,  5, 10, 12]),
        BuildRound([ 3,  4,  2,  8,  5,  7, 10,  1,  9, 12,  6, 11, 13]),
        BuildRound([ 4,  5,  3,  9,  6,  8, 11,  2, 10, 13,  7, 12,  1]),
      ]}}
  };
  public required IList<Round> Rounds { get; set; }

  private static Round BuildRound(IList<int> playerSequence)
  {
    var tableCount = playerSequence.Count / 4;
    var round = new Round
    {
      Games = [],
      FreePlayers = playerSequence.Skip(4 * tableCount).ToList(),
    };
    var currentTableNumber = 0;
    while (currentTableNumber < tableCount)
    {
      var startIndex = currentTableNumber * 4;
      round.Games.Add(new()
      {
        Table = currentTableNumber + 1,
        Participants = new([[startIndex, startIndex + 1], [startIndex + 2, startIndex + 3]]),
      });
      currentTableNumber++;
    }
    return round;
  }
}
