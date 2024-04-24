# CosmosDb by BrandonWilliamsCS

Usage instructions/suggestions:

1. Create a list of `ContainerSpecification` objects that represent the containers you intend to access (including integer sequence)
2. Call `RegisterCosmosServices.Register` with the desired DB connection information and serialization options
3. Inject an instance of `IContainerAccess` to your scoped data access services
4. Get `IDocumentReader` and/or `IDocumentWriter` from the `IContainerAccess` for the container(s) you need to use