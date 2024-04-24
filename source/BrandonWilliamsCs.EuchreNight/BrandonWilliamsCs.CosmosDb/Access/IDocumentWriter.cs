using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb.Access
{
    /// <summary>
    /// Provides functionality to edit documents in a document collection.
    /// </summary>
    /// <typeparam name="TBase">The type of document in the collection</typeparam>
    public interface IDocumentWriter<TBase> where TBase : CosmosDbDocument
    {
        Task Create<TAs>(TAs document) where TAs : TBase;
        Task Update<TAs>(TAs document) where TAs : TBase;
        Task Upsert<TAs>(TAs document) where TAs : TBase;
        Task Delete(string id, PartitionKey partitionKey);
        Task Delete<TAs>(TAs document) where TAs : TBase;
        IBatchWriter BeginBatch();

        /// <summary>
        /// Performs document write operations transactionally as one batch.
        /// </summary>
        public interface IBatchWriter
        {
            void Create<TAs>(TAs document) where TAs : TBase;
            void Update<TAs>(TAs document) where TAs : TBase;
            void Upsert<TAs>(TAs document) where TAs : TBase;
            void Delete(string id);
            void Delete<TAs>(TAs document) where TAs : TBase;
            Task Execute();
        }
    }
}
