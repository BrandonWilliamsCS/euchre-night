using System;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb.Access
{
    public class DocumentWriter<TBase> : IDocumentWriter<TBase> where TBase : CosmosDbDocument
    {
        private readonly ContainerSpecification<TBase> containerSpecification;
        private readonly Container container;

        public DocumentWriter(ContainerSpecification<TBase> containerSpecification, Container container)
        {
            this.containerSpecification = containerSpecification;
            this.container = container;
        }

        public async Task Create<TAs>(TAs document) where TAs : TBase
        {
            var partitionKey = this.containerSpecification.PartitionKeyGetter(document);
            await this.container.CreateItemAsync(document, partitionKey);
        }

        public async Task Update<TAs>(TAs document) where TAs : TBase
        {
            var partitionKey = this.containerSpecification.PartitionKeyGetter(document);
            var requestOptions = document._etag is not null
                ? new ItemRequestOptions { IfMatchEtag = document._etag }
                : null;
            await this.container.ReplaceItemAsync(document, document.Id, partitionKey, requestOptions);
        }

        public async Task Upsert<TAs>(TAs document) where TAs : TBase
        {
            var partitionKey = this.containerSpecification.PartitionKeyGetter(document);
            await this.container.UpsertItemAsync(document, partitionKey);
        }

        public async Task Delete(string id, PartitionKey partitionKey)
        {
            await this.container.DeleteItemAsync<TBase>(id, partitionKey);
        }

        public async Task Delete<TAs>(TAs document) where TAs : TBase
        {
            var partitionKey = this.containerSpecification.PartitionKeyGetter(document);
            await Delete(document.Id, partitionKey);
        }

        public IDocumentWriter<TBase>.IBatchWriter BeginBatch() => new BatchWriter(this.containerSpecification, this.container);

        private class BatchWriter : IDocumentWriter<TBase>.IBatchWriter
        {
            private readonly ContainerSpecification<TBase> containerSpecification;
            private readonly Container container;
            private TransactionalBatch? batch;

            public BatchWriter(ContainerSpecification<TBase> containerSpecification, Container container)
            {
                this.containerSpecification = containerSpecification;
                this.container = container;
            }

            public void Create<TAs>(TAs document) where TAs : TBase
            {
                EnsureBatch(document);
                this.batch!.CreateItem(document);
            }

            public void Update<TAs>(TAs document) where TAs : TBase
            {
                EnsureBatch(document);
                this.batch!.ReplaceItem(document.Id, document);
            }

            public void Upsert<TAs>(TAs document) where TAs : TBase
            {
                EnsureBatch(document);
                this.batch!.UpsertItem(document);
            }

            public void Delete(string id)
            {
                if (batch is null)
                {
                    // Presumably, batches will usually NOT be delete-only, so make sure to do deletes last.
                    throw new InvalidOperationException("First batch operation may not be id-based delete");
                }
                this.batch.DeleteItem(id);
            }

            public void Delete<TAs>(TAs document) where TAs : TBase
            {
                EnsureBatch(document);
                Delete(document.Id);
            }

            public async Task Execute()
            {
                if (batch is null)
                {
                    throw new InvalidOperationException("Cannot execute empty batch.");
                }
                using var response = await batch.ExecuteAsync();
                if (!response.IsSuccessStatusCode)
                {
                    // TODO: better persistence error, based on specific failed item
                    throw new Exception("Batch Execution Failed.");
                }
            }

            private void EnsureBatch<TAs>(TAs document) where TAs : TBase
            {
                if (this.batch is null)
                {
                    var partitionKey = this.containerSpecification.PartitionKeyGetter(document);
                    this.batch = this.container.CreateTransactionalBatch(partitionKey);
                }
            }
        }
    }
}
