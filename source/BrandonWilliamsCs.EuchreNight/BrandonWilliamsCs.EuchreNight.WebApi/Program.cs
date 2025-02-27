using BrandonWilliamsCs.CosmosDb.Tools;
using BrandonWilliamsCs.EuchreNight.WebApi;
using BrandonWilliamsCs.EuchreNight.WebApi.HandReports;
using BrandonWilliamsCs.EuchreNight.WebApi.Players;
using BrandonWilliamsCs.EuchreNight.WebApi.ScoreReports;
using BrandonWilliamsCs.EuchreNight.WebApi.Serialization;
using BrandonWilliamsCs.EuchreNight.WebApi.Sessions;
using Microsoft.AspNetCore.HttpLogging;

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
    builder.Configuration["Database:DatabaseName"]!,
    changeFeedLeaseContainerName: builder.Configuration["Database:ChangeFeedLeaseContainerName"]!,
    clientInstanceName: builder.Configuration["Database:ClientInstanceName"]!,
    configureSerializerOptions: (options) =>
    {
        options.Converters.Add(new ValueMapJsonConverterFactory());
    }
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddHttpLogging((logging) =>
{
    // TODO: configure in appsettings
    logging.LoggingFields = HttpLoggingFields.RequestPath | HttpLoggingFields.RequestQuery | HttpLoggingFields.RequestMethod | HttpLoggingFields.RequestBody
        | HttpLoggingFields.ResponseStatusCode;
});

var app = builder.Build();

// TODO: be ready to disable this based on config
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpLogging();
app.UseHttpsRedirection();

app.UseCors(
    options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
);

app.RegisterSystemEndpoints();
app.RegisterHandReportEndpoints();
app.RegisterPlayerEndpoints();
app.RegisterScoreReportEndpoints();
app.RegisterSessionEndpoints();
app.Run();
