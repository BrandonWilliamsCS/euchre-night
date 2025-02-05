using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.CosmosDb.Access;
using BrandonWilliamsCs.EuchreNight.Data;
using BrandonWilliamsCs.EuchreNight.Data.Document;
using BrandonWilliamsCs.EuchreNight.Domain;
using BrandonWilliamsCs.EuchreNight.WebApi.Mapping;

namespace BrandonWilliamsCs.EuchreNight.WebApi.ScoreReports;

public static class ScoreReportEndpoints
{
  public static void RegisterScoreReportEndpoints(this WebApplication app)
  {
    var endpointGroup = app.MapGroup("/ScoreReport").WithOpenApi();
    endpointGroup.MapGet("/", GetScoreReport).WithName(nameof(GetScoreReport));
    endpointGroup.MapPost("/StartProcessing", StartProcessing).WithName(nameof(StartProcessing));
  }

  static async Task<IResult> GetScoreReport(IContainerAccess containerAccess, Guid sessionId)
  {
    var scoreReportContainer = ContainerSpecifications.ScoreReport;
    var reader = containerAccess.ReadContainer(scoreReportContainer);
    var scoreReportDoc = await reader.QueryOne(new QueryDefinitionBuilder()
        .SetLimitAndOffset(1)
        .Build(),
      sessionId);

    if (scoreReportDoc is null)
    {
      return TypedResults.NotFound();
    }

    return TypedResults.Ok(MapToDto.MapToScoreReportDto(scoreReportDoc));
  }

  static async Task<IResult> StartProcessing(IContainerAccess containerAccess, ILogger<ScoreReport> logger)
  {
    // TODO: may need to move this to functions, or decide how to make it worth Azure App Service
    logger.LogInformation("Starting ScoreReport processing");
    var scoreReportReader = containerAccess.ReadContainer(ContainerSpecifications.ScoreReport);
    var scoreReportWriter = containerAccess.WriteContainer(ContainerSpecifications.ScoreReport);
    var listener = await containerAccess.CreateChangeFeedListener(ContainerSpecifications.HandReport);
    await listener.StartListening("ScoreReports", async (changes) =>
    {
      logger.LogInformation("Processing {changeCount} changes HandReport changes for ScoreReport", changes.Count);
      foreach (var reportsBySession in changes.GroupBy(reportDoc => reportDoc.HandReport.SessionId))
      {
        // Get the existing score report (which may be empty)
        var existingScoreReportDoc = await scoreReportReader.QueryOne(QueryDefinitionBuilder.QueryAll, reportsBySession.Key);
        var scoreReport = MapToDomain.MapToScoreReport(existingScoreReportDoc, Guid.Parse(reportsBySession.Key));
        // map and apply incoming changes
        foreach (var incomingHandDoc in reportsBySession)
        {
          logger.LogInformation("Processing hand ({roundNumber}, {tableNumber}, {handNumber}) for session {sessionId}",
            incomingHandDoc.HandReport.RoundNumber,
            incomingHandDoc.HandReport.TableNumber,
            incomingHandDoc.HandReport.HandNumber,
            incomingHandDoc.HandReport.SessionId);
          var incomingHandReport = MapToDomain.MapToHandReport(incomingHandDoc);
          scoreReport.IncludeHand(incomingHandReport);
        }

        var finalScoreReportDoc = new ScoreReportDocument(MapToDm.MapToScoreReportDm(scoreReport));
        logger.LogInformation("Saving ScoreReport for session {sessionId}", reportsBySession.Key);
        await scoreReportWriter.Upsert(finalScoreReportDoc);
      }
    });
    return TypedResults.Ok();
  }
}