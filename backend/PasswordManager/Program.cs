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
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.WithOrigins("http://localhost:5173");
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var app = builder.Build();

using var scope = app.Services.CreateScope();
await using var dbContext = scope.ServiceProvider.GetRequiredService<PasswordEntitiesDbContext>();
await dbContext.Database.EnsureCreatedAsync();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.MapControllers();

app.Run();
