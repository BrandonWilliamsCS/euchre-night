using System.Collections.Generic;
using System.Linq;
using Microsoft.Azure.Cosmos;

namespace BrandonWilliamsCs.CosmosDb
{
    /// <summary>
    /// A utility to more easily generate SQL queries for CosmosDb.
    /// </summary>
    public class QueryDefinitionBuilder
    {
        private const string baseQuery = "SELECT * from c";
        private readonly IList<string> filterConditions = new List<string>();
        private readonly IDictionary<string, object> parameters = new Dictionary<string, object>();

        public static QueryDefinition QueryAll => new(baseQuery);

        public QueryDefinitionBuilder AddFilterCondition(string condition)
        {
            this.filterConditions.Add(condition);
            return this;
        }

        public QueryDefinitionBuilder AddParameter(string name, object value)
        {
            if (!name.StartsWith("@"))
            {
                name = "@" + name;
            }

            parameters[name] = value;
            return this;
        }

        public QueryDefinition Build()
        {
            if (!filterConditions.Any())
            {
                return new QueryDefinition(baseQuery);
            }
            // Surround individual conditions with parens to minimize chance of operator funny business
            var filterClause = string.Join(") AND (", filterConditions);
            var queryString = $"{baseQuery} WHERE ({filterClause})";

            var queryDefinition = new QueryDefinition(queryString);
            foreach (var paramPair in parameters)
            {
                queryDefinition.WithParameter(paramPair.Key, paramPair.Value);
            }

            return queryDefinition;
        }
    }
}
