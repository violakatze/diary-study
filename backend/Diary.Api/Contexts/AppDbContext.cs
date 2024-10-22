using Diary.Api.Entities;
using Diary.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Diary.Api.Contexts;

/// <summary>
/// AppDbContext
/// </summary>
public class AppDbContext(DbContextOptions option, ILogger<AppDbContext> logger) : DbContext(option)
{
    /// <summary>
    /// 日次データ
    /// </summary>
    public DbSet<Daily> Dailies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(new MySqlSaveChangesInterceptor());
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 日付をユニーク制約
        modelBuilder.Entity<Daily>()
            .HasIndex(d => d.Date)
            .IsUnique();

        // DB→Entity時にUTCにする(DBの値自体はUTCであることを前提としてDateTimeにフラグを立てるだけ)
        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        var nullableDateTimeConverter = new ValueConverter<DateTime?, DateTime?>(
            v => v.HasValue ? v.Value.ToUniversalTime() : v,
            v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v);

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (entityType.IsKeyless)
            {
                continue;
            }

            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
                else if (property.ClrType == typeof(DateTime?))
                {
                    property.SetValueConverter(nullableDateTimeConverter);
                }
            }
        }
    }
}
