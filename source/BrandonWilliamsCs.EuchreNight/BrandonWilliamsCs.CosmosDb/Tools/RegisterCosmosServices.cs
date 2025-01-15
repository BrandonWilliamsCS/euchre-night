using System;
using System.Text.Json;
using BrandonWilliamsCs.CosmosDb.Access;
using BrandonWilliamsCs.CosmosDb.IntegerSequence;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.DependencyInjection;

namespace BrandonWilliamsCs.CosmosDb.Tools
{
    public static class RegisterCosmosServices
    {
        /// <summary>
        /// Registers services necessary to use the Cosmos library to a DI service collection
        /// </summary>
        /// <param name="services">The DI service container</param>
        /// <param name="configureSerializerOptions">Apply desired changes to a System.Text.Json options object</param>
        /// <param name="connectionString">The CosmosDb connection string</param>
        /// <param name="dbName">Which DB to connect to</param>
        /// <param name="integerSequenceContainerName">The name of the container that stores integer sequence documents</param>
        public static void Register(IServiceCollection services,
            string connectionString,
            string dbName,
            string? integerSequenceContainerName = null,
            Action<JsonSerializerOptions>? configureSerializerOptions = null,
            string? changeFeedLeaseContainerName = null,
            string? clientInstanceName = null)
        {
            services.AddSingleton(serviceProvider =>
            {
                var options = new JsonSerializerOptions
                {
                    // CosmosDb expects the id field of the document to be camel-case, so it's a good universal default
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                configureSerializerOptions?.Invoke(options);
                var client = new CosmosClient(connectionString, new CosmosClientOptions
                {
                    Serializer = new SystemTextJsonCosmosSerializer(options),
                });
                return client;
            });
            services.AddScoped<IContainerAccess, ContainerAccess>(serviceProvider =>
            {
                var client = serviceProvider.GetRequiredService<CosmosClient>();
                if (string.IsNullOrWhiteSpace(dbName)) { throw new Exception("Missing database name."); }
                return new ContainerAccess(client, dbName, changeFeedLeaseContainerName, clientInstanceName);
            });
            if (integerSequenceContainerName is not null)
            {
                services.AddScoped<IIntegerSequenceSource, CosmosIntegerSequenceSource>(serviceProvider =>
                {
                    var containerAccess = serviceProvider.GetRequiredService<IContainerAccess>();
                    return new CosmosIntegerSequenceSource(containerAccess, integerSequenceContainerName);
                });
            }
        }
    }
}
