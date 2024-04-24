namespace BrandonWilliamsCs.CosmosDb
{
    /// <summary>
    /// A base type for representing documents that are stored in a container.
    /// </summary>
    /// <param name="Id">The unique document identifier</param>
    public class CosmosDbDocument(string id)
    {
        // These fields are generated on the server as-is.
#pragma warning disable IDE1006 // Naming Styles
        // ReSharper disable InconsistentNaming
        public string? _rid { get; init; }
        public string? _self { get; init; }
        public string? _etag { get; init; }
        public long? _ts { get; init; }
        // ReSharper enable InconsistentNaming
#pragma warning restore IDE1006 // Naming Styles

        public string Id { get; } = id;

        public override bool Equals(object? obj)
        {
            if (obj is not CosmosDbDocument other)
            {
                return false;
            }
            return this.Id == other.Id;
        }

        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }
    }
}
