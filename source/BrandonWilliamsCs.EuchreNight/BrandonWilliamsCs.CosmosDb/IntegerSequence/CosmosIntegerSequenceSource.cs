using BrandonWilliamsCs.CosmosDb.Access;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb.IntegerSequence
{
    /// <summary>
    /// Acts as a source of integer sequences that will treat the documents of a given collection as integer sequences.
    /// </summary>
    internal class CosmosIntegerSequenceSource : IIntegerSequenceSource
    {
        private readonly IDocumentReader<IntegerSequenceDocument> reader;
        private readonly IDocumentWriter<IntegerSequenceDocument> writer;

        public CosmosIntegerSequenceSource(IContainerAccess containerAccess, string containerName)
        {
            var sequenceContainerSpecification = new ContainerSpecification<IntegerSequenceDocument>(containerName,
                "/id", doc => new PartitionKey(doc.Id));
            this.reader = containerAccess.ReadContainer(sequenceContainerSpecification);
            this.writer = containerAccess.WriteContainer(sequenceContainerSpecification);
        }

        public IIntegerSequence Get(string sequenceName) => new ServerIntegerSequence(this.reader, this.writer, sequenceName);
    }
}
