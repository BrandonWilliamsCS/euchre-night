using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.CosmosDb.Access;
using BrandonWilliamsCs.EuchreNight.Data;
using BrandonWilliamsCs.EuchreNight.Data.Document;
using BrandonWilliamsCs.EuchreNight.WebApi.Mapping;

namespace BrandonWilliamsCs.EuchreNight.WebApi.ScoreReports;

public static class ScoreReportEndpoints
{
  public static void RegisterScoreReportEndpoints(this WebApplication app)
  {
    var endpointGroup = app.MapGroup("/ScoreReport").WithOpenApi();
    endpointGroup.MapPost("/StartProcessing", StartProcessing).WithName(nameof(StartProcessing));
  }

  static async Task<IResult> StartProcessing(IContainerAccess containerAccess)
  {
    // TODO: may need to move this to functions, or decide how to make it worth Azure App Service
    await containerAccess.EnsureContainerExists(ContainerSpecifications.ScoreReport);
    var scoreReportReader = containerAccess.ReadContainer(ContainerSpecifications.ScoreReport);
    var scoreReportWriter = containerAccess.WriteContainer(ContainerSpecifications.ScoreReport);
    var listener = await containerAccess.CreateChangeFeedListener(ContainerSpecifications.HandReport);
    await listener.StartListening("ScoreReports", async (changes) =>
    {
      foreach (var reportsBySession in changes.GroupBy(reportDoc => reportDoc.HandReport.SessionId))
      {
        // Get the existing score report (which may be empty)
        var existingScoreReportDoc = await scoreReportReader.QueryOne(QueryDefinitionBuilder.QueryAll, reportsBySession.Key);
        var scoreReport = MapToDomain.MapToScoreReport(existingScoreReportDoc, Guid.Parse(reportsBySession.Key));
        // map and apply incoming changes
        foreach (var incomingHandDoc in reportsBySession)
        {
          var incomingHandReport = MapToDomain.MapToHandReport(incomingHandDoc);
          scoreReport.IncludeHand(incomingHandReport);
        }

        var finalScoreReportDoc = new ScoreReportDocument(MapToDm.MapToScoreReportDm(scoreReport));
        await scoreReportWriter.Upsert(finalScoreReportDoc);
      }
    });
    return TypedResults.Ok();
  }
}