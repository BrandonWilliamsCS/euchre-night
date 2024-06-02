using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.EuchreNight.Data.Document;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.EuchreNight.Data
{
    public static class ContainerSpecifications
    {
        public static readonly ContainerSpecification<PlayerDocument> Player =
            new("Player", "/id", doc => new PartitionKey(doc.Id.ToString()), [["/player/uniqueId"]]);

        public static readonly IReadOnlyList<ContainerSpecification> All =
        [
            Player
        ];
    }
}
