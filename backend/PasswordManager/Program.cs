using PasswordManager.Contracts;
using PasswordManager.DataAccess;
using PasswordManager.Services;
using PasswordManager.Validators;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<PasswordEntitiesDbContext>();
builder.Services.AddTransient<IPasswordEntityRequestValidator<CreatePasswordEntityRequest>, PasswordEntityRequestValidator>();
builder.Services.AddTransient<IPasswordEntityService, PasswordEntityService>();
var app = builder.Build();

using var scope = app.Services.CreateScope();
await using var dbContext = scope.ServiceProvider.GetRequiredService<PasswordEntitiesDbContext>();
await dbContext.Database.EnsureCreatedAsync();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
