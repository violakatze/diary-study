using Diary.Api.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Diary.Api.Repositories;

/// <summary>
/// MigrationRepository
/// </summary>
public interface IMigrationRepository
{
    Task Migrate();
}

/// <summary>
/// MigrationRepository
/// </summary>
public class MigrationRepository(AppDbContext context, ILogger<MigrationRepository> logger) : IMigrationRepository
{
    /// <summary>
    /// Migration実行
    /// </summary>
    /// <returns></returns>
    public async Task Migrate()
    {
        try
        {
            await context.Database.MigrateAsync();
            logger.LogInformation("migration success");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            logger.LogError(ex, "An error occurred while migrating the database.");
        }
    }
}
