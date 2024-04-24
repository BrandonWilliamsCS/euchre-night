namespace BrandonWilliamsCs.CosmosDb.IntegerSequence
{
    /// <summary>
    /// Generates <see cref="IIntegerSequence"/> intstances based on an identifying name.
    /// </summary>
    public interface IIntegerSequenceSource
    {
        IIntegerSequence Get(string sequenceName);
    }
}
