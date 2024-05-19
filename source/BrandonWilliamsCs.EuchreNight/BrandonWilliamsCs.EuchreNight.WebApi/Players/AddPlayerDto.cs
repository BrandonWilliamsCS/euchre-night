namespace BrandonWilliamsCs.EuchreNight.WebApi.Players;

public class AddPlayerDto
{
  public required string DisplayName { get; set; }
  public required string PreferredColor { get; set; }
}