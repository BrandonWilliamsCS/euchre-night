using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb.Access
{
    internal class ContainerAccess : IContainerAccess
    {
        private readonly CosmosClient dbClient;
        private readonly string databaseName;
        private readonly Database database;

        public ContainerAccess(CosmosClient dbClient, string databaseName)
        {
            this.dbClient = dbClient;
            this.databaseName = databaseName;
            database = dbClient.GetDatabase(this.databaseName);
        }

        public async Task EnsureContainerExists(ContainerSpecification specification)
        {
            var containerProperties = new ContainerProperties(specification.Name, specification.PartitionKeyPath);
            if (specification.UniqueKeyPaths is not null)
            {
                foreach (var uniqueKeyPaths in specification.UniqueKeyPaths)
                {
                    var uniqueKey = new UniqueKey();
                    containerProperties.UniqueKeyPolicy.UniqueKeys.Add(uniqueKey);
                    foreach (var uniqueKeyPath in uniqueKeyPaths)
                    {
                        uniqueKey.Paths.Add(uniqueKeyPath);
                    }
                }
            }
            await database.CreateContainerIfNotExistsAsync(new ContainerProperties(specification.Name,
                specification.PartitionKeyPath));
        }

        public IDocumentReader<T> ReadContainer<T>(ContainerSpecification<T> specification) where T : CosmosDbDocument
        {
            var container = GetContainer<T>(specification);
            return new DocumentReader<T>(container);
        }

        public IDocumentWriter<T> WriteContainer<T>(ContainerSpecification<T> specification) where T : CosmosDbDocument
        {
            var container = GetContainer<T>(specification);
            return new DocumentWriter<T>(specification, container);
        }

        private Container GetContainer<T>(ContainerSpecification<T> specification) =>
            dbClient.GetContainer(databaseName, specification.Name);
    }
}
