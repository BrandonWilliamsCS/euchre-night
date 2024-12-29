namespace BrandonWilliamsCs.EuchreNight.Domain;

/// <summary>
/// A group of related games amongst a pool of players. These games may come in different pre-planned structures or be free-form.
/// </summary>
/// <remarks>
/// Actual play details in and across games are out of scope for a session and should be tracked elsewhere.
/// </remarks>
public class Session(Guid uniqueId,
  string? description,
  DateTime startTime,
  IReadOnlyDictionary<int, Player> playerMappings,
  SessionPlan sessionPlan) : Entity(uniqueId)
{
  public string? Description { get; private set; } = description;
  public DateTime StartTime { get; private set; } = startTime;
  public IReadOnlyDictionary<int, Player> PlayerMappings { get; private set; } = playerMappings;
  public SessionPlan SessionPlan { get; private set; } = sessionPlan;

  public static Session New(string? description, DateTime startTime, IReadOnlyDictionary<int, Player> playerMappings, SessionPlan sessionPlan) =>
    new(Guid.NewGuid(), description, startTime, playerMappings, sessionPlan);

}
