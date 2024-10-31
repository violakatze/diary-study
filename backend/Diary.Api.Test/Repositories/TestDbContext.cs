using Diary.Api.Contexts;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NSubstitute;

namespace Diary.Api.Repositories;

public class TestDbContext
{
    public static AppDbContext CreateContext()
    {
        var connection = new SqliteConnection("Filename=:memory:");
        connection.Open();

        var options = new DbContextOptionsBuilder<AppDbContext>().UseSqlite(connection).Options;
        var logger = Substitute.For<ILogger<AppDbContext>>();

        var context = new AppDbContext(options, logger);
        if (context.Database.EnsureCreated())
        {
            return context;
        }

        throw new Exception("テスト用context作成失敗");
    }
}
