using Microsoft.Azure.Cosmos;
using System;
using System.Collections.Generic;

namespace BrandonWilliamsCs.CosmosDb
{
    /// <summary>
    /// Serves as an opaque object that contains all information neccessary to create or access a container
    /// </summary>
    /// <param name="Name">The container name</param>
    /// <param name="PartitionKeyPath">The path to the partition key for the container</param>
    /// <param name="UniqueKeyPaths">Specifies all unique keys for the container</param>
    public abstract record ContainerSpecification(string Name, string PartitionKeyPath,
        IReadOnlyList<IReadOnlyList<string>>? UniqueKeyPaths = null);

    /// <summary>
    /// Serves as an opaque object that contains all information neccessary to create or access a container
    /// </summary>
    /// <typeparam name="TBase">The base type that represents all documents in the container</typeparam>
    /// <param name="Name">The container name</param>
    /// <param name="PartitionKeyPath">The path to the partition key for the container</param>
    /// <param name="PartitionKeyGetter">Derives the partition key for a document</param>
    /// <param name="UniqueKeyPaths">Specifies all unique keys for the container</param>
    public record ContainerSpecification<TBase>(string Name, string PartitionKeyPath,
        Func<TBase, PartitionKey> PartitionKeyGetter,
        IReadOnlyList<IReadOnlyList<string>>? UniqueKeyPaths = null) : ContainerSpecification(Name, PartitionKeyPath,
        UniqueKeyPaths);
}
