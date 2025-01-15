using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BrandonWilliamsCs.CosmosDb.ChangeFeed;

public interface IChangeFeedListener<T>
{
  Task StartListening(string processorName, Func<IReadOnlyCollection<T>, Task> onChanges);
}
