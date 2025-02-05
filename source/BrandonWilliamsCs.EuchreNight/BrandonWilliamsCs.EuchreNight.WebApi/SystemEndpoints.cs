using BrandonWilliamsCs.CosmosDb.Access;
using BrandonWilliamsCs.EuchreNight.Data;

namespace BrandonWilliamsCs.EuchreNight.WebApi;

public static class SystemEndpoints
{
  public static void RegisterSystemEndpoints(this WebApplication app)
  {
    var endpointGroup = app.MapGroup("/System").WithOpenApi();
    endpointGroup.MapPost("/Initialize", Initialize).WithName(nameof(Initialize));
  }

  static async Task<IResult> Initialize(IContainerAccess containerAccess)
  {
    foreach (var spec in ContainerSpecifications.All)
    {
      await containerAccess.EnsureContainerExists(spec);
    }
    return TypedResults.Ok();
  }
}