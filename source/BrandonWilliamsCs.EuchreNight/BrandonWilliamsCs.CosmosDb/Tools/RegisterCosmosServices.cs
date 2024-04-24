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
            Action<JsonSerializerOptions> configureSerializerOptions,
            string connectionString,
            string dbName,
            string integerSequenceContainerName)
        {
            services.AddSingleton(serviceProvider =>
            {
                var options = new JsonSerializerOptions();
                configureSerializerOptions(options);
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
                return new ContainerAccess(client, dbName);
            });
            services.AddScoped<IIntegerSequenceSource, CosmosIntegerSequenceSource>(serviceProvider =>
            {
                var containerAccess = serviceProvider.GetRequiredService<IContainerAccess>();
                if (string.IsNullOrWhiteSpace(integerSequenceContainerName)) { throw new Exception("Missing integer sequence container name."); }
                return new CosmosIntegerSequenceSource(containerAccess, integerSequenceContainerName);
            });
        }
    }
}
