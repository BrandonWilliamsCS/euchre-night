namespace BrandonWilliamsCs.EuchreNight.Domain;

public class Player
{
  public required Guid UniqueId { get; set; }
  public required string DisplayName { get; set; }
  public required string? PreferredColor { get; set; }
}
