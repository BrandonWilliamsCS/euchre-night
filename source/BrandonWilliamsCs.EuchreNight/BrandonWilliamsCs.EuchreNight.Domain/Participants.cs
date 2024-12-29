namespace BrandonWilliamsCs.EuchreNight.Domain;

/// <summary>
/// Represents the relationships between all of the players involved in a game.
/// </summary>
/// <typeparam name="T">The representation of a single player</typeparam>
public record Participants<T>(IList<IList<T>> PlayersByTeam);
