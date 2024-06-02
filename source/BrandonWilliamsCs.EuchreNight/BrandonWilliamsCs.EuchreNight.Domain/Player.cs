namespace BrandonWilliamsCs.EuchreNight.Domain;

public class Player(Guid uniqueId) : Entity(uniqueId)
{
  public required string DisplayName { get; set; }
  public required string? PreferredColor { get; set; }

  public static Player New(string displayName, string? preferredColor) => new(Guid.NewGuid())
  {
    DisplayName = displayName,
    PreferredColor = preferredColor,
  };
}
