using Diary.Api;
using Diary.Api.Contexts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.RegisterRepositories();
builder.Services.AddSwaggerGen();

builder.Services.AddProblemDetails();

var configuration = builder.Configuration;
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySQL(configuration.GetConnectionString("DefaultConnection")!));

builder.Services.AddExceptionHandler<CustomExceptionHandler>();

var app = builder.Build();

app.UseExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(s => s.EnableTryItOutByDefault());
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.UseCors(policy => policy.WithOrigins(["*"]).AllowAnyHeader().AllowAnyMethod());

app.MapControllers();

app.Run();
