namespace BrandonWilliamsCs.EuchreNight.Domain;

public class Entity(Guid uniqueId)
{
  public Guid UniqueId { get; } = uniqueId;

  // TODO: default equality based on the unique id?
}
