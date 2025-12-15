using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using StudentApi.Data;
using StudentApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<StudentDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<StudentDbContext>()
    .AddDefaultTokenProviders();




builder.Services.AddCors(options =>
{
    options.AddPolicy("ng", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseRouting();
app.UseCors("ng");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var ctx = scope.ServiceProvider.GetRequiredService<StudentDbContext>();

    if (!ctx.Students.Any())
    {
        ctx.Students.AddRange(
            new Student { Name = "Arnav", Class = "10", Section = "A" },
            new Student { Name = "Arjun", Class = "11", Section = "B" }
        );
        ctx.SaveChanges();
    }
}
app.Run();
