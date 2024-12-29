using BrandonWilliamsCs.EuchreNight.Domain.RoundRobin;

namespace BrandonWilliamsCs.EuchreNight.Domain;

/// <summary>
/// Indicates the rules and expectations of a session.
/// This includes the high-level structure of the session, such as round-robin or
/// tournament, which may include a structure of expected games.
/// </summary>
/// <remarks>
/// This information is largely decided before activation, but realistically may
/// only be created just before starting a session.
/// </remarks>
public class SessionPlan(IList<string> tables,
  IndividualRoundRobinGameStructure gameStructure)
{
  public IList<string> Tables { get; private set; } = tables;
  // TODO: Allow other structures, probably store as an interface
  public IndividualRoundRobinGameStructure GameStructure { get; private set; } = gameStructure;
}
