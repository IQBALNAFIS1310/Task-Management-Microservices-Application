/*var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
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

app.UseAuthorization();

app.MapControllers();

app.Run();
*/

using Microsoft.EntityFrameworkCore;
using TaskService.Data;
using TaskService.Services;

var builder = WebApplication.CreateBuilder(args);

// ================= SERVICES =================

// CORS untuk React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();

// DbContext
builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// ---------------------
// TaskService dengan HttpClient
builder.Services.AddHttpClient<ITaskService, TaskService.Services.TaskService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// ================= BUILD =================
var app = builder.Build();

// ================= MIDDLEWARE =================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Matikan HTTPS redirect dulu supaya mudah testing
// app.UseHttpsRedirection();

// Aktifkan CORS
app.UseCors("AllowReact");

app.UseAuthorization();
app.MapControllers();

app.Run();
