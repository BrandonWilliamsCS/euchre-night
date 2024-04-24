using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb.Access
{
    public class DocumentReader<T> : IDocumentReader<T> where T : CosmosDbDocument
    {
        private readonly Container container;

        public DocumentReader(Container container)
        {
            this.container = container;
        }

        public Task<T?> Get(string id, PartitionKey partitionKey) => this.container.ReadOrDefault<T>(id, partitionKey);

        public IAsyncEnumerable<U> Project<U>(QueryDefinition queryDefinition, PartitionKey? partitionKey, int? limit) =>
            this.container.Query<U>(queryDefinition, new QueryRequestOptions
            {
                PartitionKey = partitionKey,
                MaxItemCount = limit,
            });

        public IDocumentReader<U> CastValues<U>() where U : T => new CastDocumentReader<U>(this);

        private class CastDocumentReader<U> : IDocumentReader<U> where U : T
        {
            private readonly IDocumentReader<T> baseReader;

            public CastDocumentReader(IDocumentReader<T> baseReader)
            {
                this.baseReader = baseReader;
            }

            public async Task<U?> Get(string id, PartitionKey partitionKey) => (U?)await this.baseReader.Get(id, partitionKey);

            public IAsyncEnumerable<V> Project<V>(QueryDefinition queryDefinition, PartitionKey? partitionKey, int? limit) =>
                this.baseReader.Project<V>(queryDefinition, partitionKey, limit);

            public IDocumentReader<V> CastValues<V>() where V : U
            {
                return this.baseReader.CastValues<V>();
            }
        }
    }
}
