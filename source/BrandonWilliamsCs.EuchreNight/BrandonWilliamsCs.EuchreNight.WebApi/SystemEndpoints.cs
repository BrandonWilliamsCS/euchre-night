using System.Text.Json;
using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.CosmosDb.Access;
using BrandonWilliamsCs.EuchreNight.Data;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.EuchreNight.WebApi;

public static class SystemEndpoints
{
  public static void RegisterSystemEndpoints(this WebApplication app)
  {
    var endpointGroup = app.MapGroup("/System").WithOpenApi();
    endpointGroup.MapPost("/Initialize", Initialize).WithName(nameof(Initialize));
    endpointGroup.MapPost("/ExportAllDocuments", ExportAllDocuments).WithName(nameof(ExportAllDocuments));
    endpointGroup.MapPost("/ImportDocuments", ImportDocuments).WithName(nameof(ImportDocuments));
  }

  static async Task<IResult> Initialize(IContainerAccess containerAccess)
  {
    foreach (var spec in ContainerSpecifications.All)
    {
      await containerAccess.EnsureContainerExists(spec);
    }
    return TypedResults.Ok();
  }

  static async Task<IResult> ExportAllDocuments(IContainerAccess containerAccess)
  {
    var exportDir = Path.Combine(AppContext.BaseDirectory, "CosmosDbExports");
    Directory.CreateDirectory(exportDir);

    await ExportAllDocumentsInContainer(ContainerSpecifications.Player, containerAccess, exportDir);
    await ExportAllDocumentsInContainer(ContainerSpecifications.Session, containerAccess, exportDir);
    await ExportAllDocumentsInContainer(ContainerSpecifications.HandReport, containerAccess, exportDir);
    await ExportAllDocumentsInContainer(ContainerSpecifications.ScoreReport, containerAccess, exportDir);

    return TypedResults.Ok($"Exported all documents to {exportDir}");
  }

  private static async Task ExportAllDocumentsInContainer<T>(ContainerSpecification<T> spec, IContainerAccess containerAccess, string exportDir) where T : CosmosDbDocument
  {
      var container = containerAccess.ReadContainer(spec);
      var allDocs = await container.Query(QueryDefinitionBuilder.QueryAll, (PartitionKey?)null).ToListAsync();

      var json = System.Text.Json.JsonSerializer.Serialize(allDocs, new System.Text.Json.JsonSerializerOptions { WriteIndented = true, PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
      var filePath = Path.Combine(exportDir, $"{spec.Name}.json");
      await File.WriteAllTextAsync(filePath, json);
  }

  public class ImportDocumentsRequest
  {
    public required string ContainerName { get; set; }
    public required string FilePath { get; set; }
  }

  static async Task<IResult> ImportDocuments(ImportDocumentsRequest request, IContainerAccess containerAccess)
  {
    // Find the container specification by name
    var specObj = ContainerSpecifications.All.FirstOrDefault(s => s.Name == request.ContainerName);
    if (specObj == null)
      return TypedResults.BadRequest($"Container '{request.ContainerName}' not found.");

    // Use reflection to get the generic type argument
    var specType = specObj.GetType();
    var docType = specType.GetGenericArguments().FirstOrDefault();
    if (docType == null)
      return TypedResults.BadRequest("Could not determine document type for container.");

    // Read and deserialize the JSON file
    if (!File.Exists(request.FilePath))
      return TypedResults.BadRequest($"File '{request.FilePath}' does not exist.");

    var json = await File.ReadAllTextAsync(request.FilePath);
    var docs = System.Text.Json.JsonSerializer.Deserialize(json, typeof(List<>).MakeGenericType(docType));
    if (docs == null)
      return TypedResults.BadRequest("Failed to deserialize documents.");

    // Get the container and import documents
    var container = containerAccess.ReadContainer((dynamic)specObj);
    foreach (var doc in (System.Collections.IEnumerable)docs)
    {
      await container.UpsertAsync((dynamic)doc);
    }

    return TypedResults.Ok($"Imported documents into container '{request.ContainerName}' from '{request.FilePath}'.");
  }
}