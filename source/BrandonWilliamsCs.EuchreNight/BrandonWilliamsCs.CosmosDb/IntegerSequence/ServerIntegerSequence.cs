using System;
using System.Threading.Tasks;
using BrandonWilliamsCs.CosmosDb.Access;

namespace BrandonWilliamsCs.CosmosDb.IntegerSequence
{
    /// <summary>
    /// Uses a single <see cref="IntegerSequenceDocument"/> to maintain an integer sequence.
    /// </summary>
    internal class ServerIntegerSequence : IIntegerSequence
    {
        private readonly IDocumentReader<IntegerSequenceDocument> reader;
        private readonly IDocumentWriter<IntegerSequenceDocument> writer;
        private readonly string sequenceName;

        public ServerIntegerSequence(IDocumentReader<IntegerSequenceDocument> reader,
            IDocumentWriter<IntegerSequenceDocument> writer, string sequenceName)
        {
            this.sequenceName = sequenceName;
            this.reader = reader;
            this.writer = writer;
        }

        public async Task<long> Claim() => (await ClaimRange(1)).low;

        public async Task<(long low, long high)> ClaimRange(int size)
        {
            if (size < 1)
            {
                throw new ArgumentException("Cannot claim an empty or negative range.", nameof(size));
            }

            // Grab the latest sequence document from the server
            var sequenceDocument = await this.reader.Get(sequenceName, sequenceName);
            if (sequenceDocument is null)
            {
                throw new InvalidOperationException("Integer sequence not found.");
            }

            // Update it to reflect the now-claimed values.
            var updatedSequenceDocument = sequenceDocument.Advance(size);
            // TODO: retry on concurrent update failure - but that's pretty rare!
            await this.writer.Update(updatedSequenceDocument);

            // Return the claimed range. Since both endpoints are included, subtract 1 from the full range size.
            return (sequenceDocument.Next, updatedSequenceDocument.Next - 1);
        }
    }
}
