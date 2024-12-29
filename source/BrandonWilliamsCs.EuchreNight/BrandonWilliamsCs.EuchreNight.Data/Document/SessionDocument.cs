using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.EuchreNight.Domain;

namespace BrandonWilliamsCs.EuchreNight.Data.Document
{
  public class SessionDocument(string id, SessionDocument.SessionDm session) : CosmosDbDocument(id)
  {
    public SessionDm Session { get; set; } = session;

    public class SessionDm
    {
      public required string? Description { get; set; }
      public required DateTime StartTime { get; set; }
      public required IReadOnlyDictionary<int, PlayerDm> PlayerMappings { get; set; }
      public required SessionPlanDm SessionPlan { get; set; }
    }

    public class PlayerDm
    {
      public required Guid UniqueId { get; set; }
      public required string DisplayName { get; set; }
    }

    public class SessionPlanDm
    {
      public required IList<string> Tables { get; set; }
      public required GameStructureDm GameStructure { get; set; }
    }

    public class GameStructureDm
    {
      public required IList<RoundDm> Rounds { get; set; }
    }

    public class RoundDm
    {
      public required IList<PlannedGameDm> Games { get; set; }
      public required IList<int> FreePlayers { get; set; }
    }

    public class PlannedGameDm
    {
      public required int Table { get; set; }
      public required Participants<int> Participants { get; set; }
    }
  }
}
