using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb.ChangeFeed;

public class ChangeFeedListener<T>(Container leaseContainer, Container targetContainer, string clientInstanceName) : IChangeFeedListener<T>
{
  public async Task StartListening(string processorName, Func<IReadOnlyCollection<T>, Task> onChanges)
  {
    var changeFeedProcessor = targetContainer
                .GetChangeFeedProcessorBuilder<T>(processorName, (x, y) => onChanges(x))
                    .WithInstanceName(clientInstanceName)
                    .WithLeaseContainer(leaseContainer)
                    // TODO: allow this to be configurable so we don't try to re-process old sessions.
                    .WithStartTime(DateTime.MinValue.ToUniversalTime())
                    .Build();

    await changeFeedProcessor.StartAsync();
  }
}
