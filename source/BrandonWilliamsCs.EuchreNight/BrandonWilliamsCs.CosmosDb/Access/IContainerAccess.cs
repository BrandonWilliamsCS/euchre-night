using System.Threading.Tasks;

namespace BrandonWilliamsCs.CosmosDb.Access
{
    /// <summary>
    /// Provides access to a document container for reading or writing
    /// </summary>
    public interface IContainerAccess
    {
        Task EnsureContainerExists(ContainerSpecification specification);
        IDocumentReader<T> ReadContainer<T>(ContainerSpecification<T> specification) where T : CosmosDbDocument;
        IDocumentWriter<T> WriteContainer<T>(ContainerSpecification<T> specification) where T : CosmosDbDocument;
    }
}
