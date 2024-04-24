using System.Threading.Tasks;

namespace BrandonWilliamsCs.CosmosDb.IntegerSequence
{
    /// <summary>
    /// Provides access to an increasing sequence of integers that can be "claimed" for exclusive use.
    /// </summary>
    /// <remarks>
    /// Intended mainly to be used to guarantee unique integer document/object ids.
    /// </remarks>
    public interface IIntegerSequence
    {
        Task<long> Claim();
        Task<(long low, long high)> ClaimRange(int size);
    }
}
