using System;
using System.Threading.Tasks;
using BrandonWilliamsCs.CosmosDb.ChangeFeed;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb.Access
{
    internal class ContainerAccess : IContainerAccess
    {
        private readonly CosmosClient dbClient;
        private readonly string databaseName;
        private readonly string? leaseContainerName;
        private readonly string? clientInstanceName;
        private readonly Database database;

        public ContainerAccess(CosmosClient dbClient, string databaseName, string? leaseContainerName, string? clientInstanceName)
        {
            this.dbClient = dbClient;
            this.databaseName = databaseName;
            this.leaseContainerName = leaseContainerName;
            this.clientInstanceName = clientInstanceName;
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

        public async Task<IChangeFeedListener<T>> CreateChangeFeedListener<T>(ContainerSpecification<T> targetContainerSpec)
        {
            if (this.leaseContainerName is null || this.clientInstanceName is null) { throw new InvalidOperationException("Can't listen to the change feed without a lease container name and a client instance name."); }
            await database.CreateContainerIfNotExistsAsync(new ContainerProperties(this.leaseContainerName, "/id"));
            var leaseContainer = this.dbClient.GetContainer(this.databaseName, this.leaseContainerName);
            var targetContainer = this.dbClient.GetContainer(databaseName, targetContainerSpec.Name);
            return new ChangeFeedListener<T>(leaseContainer, targetContainer, this.clientInstanceName);
        }

        private Container GetContainer<T>(ContainerSpecification<T> specification) =>
            dbClient.GetContainer(databaseName, specification.Name);
    }
}
