using BrandonWilliamsCs.EuchreNight.Domain;

namespace BrandonWilliamsCs.EuchreNight.WebApi.Sessions;

public class SessionDto
{
  public required Guid? UniqueId { get; set; }
  public required string? Description { get; set; }
  public required DateTime StartTime { get; set; }
  public required IReadOnlyDictionary<int, PlayerDto> PlayerMappings { get; set; }
  public required SessionPlanDto SessionPlan { get; set; }

  public class PlayerDto
  {
    public required Guid UniqueId { get; set; }
    public required string DisplayName { get; set; }
  }

  public class SessionPlanDto
  {
    public required IList<string> Tables { get; set; }
    public required GameStructureDto GameStructure { get; set; }
  }

  public class GameStructureDto
  {
    public required IList<RoundDto> Rounds { get; set; }
  }

  public class RoundDto
  {
    public required IList<PlannedGameDto> Games { get; set; }
    public required IList<int> FreePlayers { get; set; }
  }

  public class PlannedGameDto
  {
    public required int Table { get; set; }
    public required Participants<int> Participants { get; set; }
  }
}