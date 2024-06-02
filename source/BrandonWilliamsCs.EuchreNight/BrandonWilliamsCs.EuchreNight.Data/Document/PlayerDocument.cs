using BrandonWilliamsCs.CosmosDb;
using BrandonWilliamsCs.EuchreNight.Domain;

namespace BrandonWilliamsCs.EuchreNight.Data.Document
{
    public class PlayerDocument(string id, Player player) : CosmosDbDocument(id)
    {
        public Player Player { get; set; } = player;
    }
}
