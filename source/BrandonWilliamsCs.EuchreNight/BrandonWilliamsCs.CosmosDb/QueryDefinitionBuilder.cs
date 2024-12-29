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
        private readonly IList<string> filterConditions = [];
        private readonly IList<(string term, bool desc)> orderCriteria = [];
        private readonly IDictionary<string, object> parameters = new Dictionary<string, object>();
        private int? limit = null;
        private int offset = 0;

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

        public QueryDefinitionBuilder AddOrder(string term, bool desc = false)
        {
            this.orderCriteria.Add((term, desc));
            return this;
        }

        public QueryDefinitionBuilder SetLimitAndOffset(int limit, int offset = 0)
        {
            this.limit = limit;
            this.offset = offset;
            return this;
        }

        public QueryDefinition Build()
        {
            var queryString = baseQuery;

            if (this.filterConditions.Any())
            {
                // Surround individual conditions with parens to minimize chance of operator funny business
                var filterClause = string.Join(") AND (", filterConditions);
                queryString = $"{queryString} WHERE ({filterClause})";
            }

            if (this.orderCriteria.Any())
            {
                var orderClause = string.Join(", ", orderCriteria.Select(orderItem => $"({orderItem.term}){(orderItem.desc ? " DESC" : "")}"));
                queryString = $"{queryString} ORDER BY {orderClause}";
            }

            if (this.limit.HasValue)
            {
                queryString = $"{queryString} OFFSET {this.offset} LIMIT {this.limit}";
            }

            var queryDefinition = new QueryDefinition(queryString);
            foreach (var paramPair in parameters)
            {
                queryDefinition.WithParameter(paramPair.Key, paramPair.Value);
            }

            return queryDefinition;
        }
    }
}
