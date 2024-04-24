using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BrandonWilliamsCs.CosmosDb.Access;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb
{
    public static class QueryExtensions
    {
        public static async IAsyncEnumerable<T> Query<T>(this Container container, QueryDefinition queryDefinition,
            QueryRequestOptions? options = null)
        {
            FeedIterator<T>? iterator = null;
            try
            {
                iterator = container.GetItemQueryIterator<T>(queryDefinition, null, options);
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                // Not truly an exception, as some queries simply have no results.
                iterator?.Dispose();
                yield break;
            }

            using (iterator)
            {
                while (iterator.HasMoreResults)
                {
                    foreach (var product in await iterator.ReadNextAsync())
                    {
                        yield return product;
                    }
                }
            }
        }

        public static Task<T?> QueryOne<T>(this Container container, QueryDefinition queryDefinition,
            PartitionKey? partitionKey = null)
        {
            var options = new QueryRequestOptions
            {
                MaxItemCount = 1,
                PartitionKey = partitionKey,
            };
            return container.Query<T>(queryDefinition, options).FirstOrDefaultAsync();
        }

        public static Task<T?> QueryOne<T>(this IDocumentReader<T> reader, QueryDefinition queryDefinition,
            PartitionKey? partitionKey) where T : CosmosDbDocument => reader.Query(queryDefinition, partitionKey, 1)
            .FirstOrDefaultAsync();
        public static Task<T?> QueryOne<T>(this IDocumentReader<T> reader, QueryDefinition queryDefinition,
            double partitionKey) where T : CosmosDbDocument => QueryOne(reader, queryDefinition, new PartitionKey(partitionKey));
        public static Task<T?> QueryOne<T>(this IDocumentReader<T> reader, QueryDefinition queryDefinition,
            string partitionKey) where T : CosmosDbDocument => QueryOne(reader, queryDefinition, new PartitionKey(partitionKey));
        public static Task<T?> QueryOne<T>(this IDocumentReader<T> reader, QueryDefinition queryDefinition,
            bool partitionKey) where T : CosmosDbDocument => QueryOne(reader, queryDefinition, new PartitionKey(partitionKey));

        public static async Task<T?> ReadOrDefault<T>(this Container container, string id, PartitionKey partitionKey)
        {
            try
            {
                var response = await container.ReadItemAsync<T>(id, partitionKey);
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return default;
            }
        }

        public static async IAsyncEnumerable<T> Where<T>(this IAsyncEnumerable<T> sequence, Func<T, bool> predicate)
        {
            await foreach (var item in sequence)
            {
                if (predicate(item))
                {
                    yield return item;
                }
            }
        }

        public static async IAsyncEnumerable<R> Select<T, R>(this IAsyncEnumerable<T> sequence, Func<T, R> mapper)
        {
            await foreach (var item in sequence)
            {
                yield return mapper(item);
            }
        }

        public static async Task<IList<T>> ToListAsync<T>(this IAsyncEnumerable<T> sequence)
        {
            var list = new List<T>();
            await foreach (var item in sequence)
            {
                list.Add(item);
            }
            return list;
        }

        public static async Task<T?> FirstOrDefaultAsync<T>(this IAsyncEnumerable<T> sequence)
        {
            await foreach (var item in sequence)
            {
                return item;
            }

            return default;
        }
    }
}
