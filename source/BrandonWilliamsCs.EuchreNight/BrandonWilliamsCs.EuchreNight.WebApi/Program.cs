using BrandonWilliamsCs.CosmosDb.Tools;
using BrandonWilliamsCs.EuchreNight.WebApi.HandReports;
using BrandonWilliamsCs.EuchreNight.WebApi.Players;
using BrandonWilliamsCs.EuchreNight.WebApi.Sessions;


var builder = WebApplication.CreateBuilder(args);
builder.Configuration
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .AddJsonFile("appsettings.local.json")
            .Build();

// Add services to the container.
RegisterCosmosServices.Register(
    builder.Services,
    // If these are null, just let the Register throw instead
    builder.Configuration["Database:ConnectionString"]!,
    builder.Configuration["Database:DatabaseName"]!
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.RegisterHandReportEndpoints();
app.RegisterPlayerEndpoints();
app.RegisterSessionEndpoints();
app.Run();
