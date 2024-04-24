namespace BrandonWilliamsCs.CosmosDb.IntegerSequence
{
    /// <summary>
    /// A document that stores the next available value in an integer sequence
    /// </summary>
    /// <param name="Id">The document Id</param>
    /// <param name="Next">The next available number in the sequence</param>
    public sealed class IntegerSequenceDocument(string id, long next) : CosmosDbDocument(id)
    {
        public long Next { get; } = next;

        public IntegerSequenceDocument Advance(long count) => new IntegerSequenceDocument(this.Id, this.Next + count);
    }
}
