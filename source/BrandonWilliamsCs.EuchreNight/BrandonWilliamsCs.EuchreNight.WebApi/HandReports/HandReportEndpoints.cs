using BrandonWilliamsCs.CosmosDb.Access;
using BrandonWilliamsCs.EuchreNight.Data;
using BrandonWilliamsCs.EuchreNight.Data.Document;
using BrandonWilliamsCs.EuchreNight.WebApi.Mapping;

namespace BrandonWilliamsCs.EuchreNight.WebApi.HandReports;

public static class HandReportEndpoints
{
  public static void RegisterHandReportEndpoints(this WebApplication app)
  {
    var endpointGroup = app.MapGroup("/HandReport").WithOpenApi();
    endpointGroup.MapPost("/", PlaceHandReport).WithName(nameof(PlaceHandReport));
  }

  static async Task<IResult> PlaceHandReport(PlaceHandReportDto dto, IContainerAccess containerAccess)
  {
    await SaveHandReport(containerAccess, dto);
    return TypedResults.Ok();
  }

  private static async Task SaveHandReport(IContainerAccess containerAccess, PlaceHandReportDto handReport)
  {
    var handReportDm = MapToDm.MapToHandReportDm(handReport, Guid.NewGuid());
    var handReportWriter = containerAccess.WriteContainer(ContainerSpecifications.HandReport);
    var handReportDoc = new HandReportDocument(handReportDm);
    await handReportWriter.Create(handReportDoc);
  }
}