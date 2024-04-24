using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb.Access
{
    /// <summary>
    /// Provides functionality to read from a document collection.
    /// </summary>
    /// <typeparam name="T">The type of document in the query</typeparam>
    public interface IDocumentReader<T> where T : CosmosDbDocument
    {
        Task<T?> Get(string id, PartitionKey partitionKey);
        Task<T?> Get(string id, string partitionKey) => Get(id, new PartitionKey(partitionKey));
        Task<T?> Get(string id, double partitionKey) => Get(id, new PartitionKey(partitionKey));
        Task<T?> Get(string id, bool partitionKey) => Get(id, new PartitionKey(partitionKey));

        IAsyncEnumerable<T> Query(QueryDefinition queryDefinition, PartitionKey? partitionKey, int? limit = null) =>
            Project<T>(queryDefinition, partitionKey, limit);
        IAsyncEnumerable<T> Query(QueryDefinition queryDefinition, string partitionKey, int? limit = null) =>
            Query(queryDefinition, new PartitionKey(partitionKey), limit);
        IAsyncEnumerable<T> Query(QueryDefinition queryDefinition, double partitionKey, int? limit = null) =>
            Query(queryDefinition, new PartitionKey(partitionKey), limit);
        IAsyncEnumerable<T> Query(QueryDefinition queryDefinition, bool partitionKey, int? limit = null) =>
            Query(queryDefinition, new PartitionKey(partitionKey), limit);

        IAsyncEnumerable<U> Project<U>(QueryDefinition queryDefinition, PartitionKey? partitionKey, int? limit = null);
        IAsyncEnumerable<U> Project<U>(QueryDefinition queryDefinition, string partitionKey, int? limit = null) =>
            Project<U>(queryDefinition, new PartitionKey(partitionKey), limit);
        IAsyncEnumerable<U> Project<U>(QueryDefinition queryDefinition, double partitionKey, int? limit = null) =>
            Project<U>(queryDefinition, new PartitionKey(partitionKey), limit);
        IAsyncEnumerable<U> Project<U>(QueryDefinition queryDefinition, bool partitionKey, int? limit = null) =>
            Project<U>(queryDefinition, new PartitionKey(partitionKey), limit);

        IDocumentReader<U> CastValues<U>() where U : T;
    }
}
