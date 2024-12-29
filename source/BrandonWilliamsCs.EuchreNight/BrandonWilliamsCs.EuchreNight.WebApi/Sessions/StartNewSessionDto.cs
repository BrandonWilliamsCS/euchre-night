namespace BrandonWilliamsCs.EuchreNight.WebApi.Sessions;

public class StartNewSessionDto
{
  public required string Description { get; set; }
  public required DateTime StartTime { get; set; }
  /// <summary>
  /// A list of the players for this session, in order of number assignment.
  /// </summary>
  /// <remarks>
  /// This can be treated as a "search string" that matches the name, id, and any other fields that could uniquely describe an existing player.
  /// </remarks>
  public required IList<string> Players { get; set; }
}