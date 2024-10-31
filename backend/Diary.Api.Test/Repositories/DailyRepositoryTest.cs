using Diary.Api.Entities;
using Diary.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NSubstitute;
using System.Data;
using Xunit;
using Assert = Xunit.Assert;

namespace Diary.Api.Repositories;

/// <summary>
/// DailyRepository Tests
/// </summary>
public class DailyRepositoryTest
{
    private ILogger<DailyRepository> Logger { get; } = Substitute.For<ILogger<DailyRepository>>();

    // 登録用データと動作結果期待値
    public static TheoryData<Daily, DateTime, string, Weather> AddData
    {
        get
        {
            var data = new TheoryData<Daily, DateTime, string, Weather>();
            data.Add(new Daily { Id = 0, Date = new DateTime(2000, 1, 1), Content = "ABCDE", Weather = Weather.Sunny }, new DateTime(2000, 1, 1), "ABCDE", Weather.Sunny);
            data.Add(new Daily { Id = 0, Date = new DateTime(2000, 1, 2), Content = "", Weather = Weather.Cloudy }, new DateTime(2000, 1, 2), "", Weather.Cloudy);
            data.Add(new Daily { Id = 0, Date = new DateTime(2000, 1, 3), Content = new string('1', 100), Weather = Weather.Rainy }, new DateTime(2000, 1, 3), new string('1', 100), Weather.Rainy);
            return data;
        }
    }

    // 更新用データと動作結果期待値
    public static TheoryData<Daily, DateTime, string, Weather> UpdateData
    {
        get
        {
            var data = new TheoryData<Daily, DateTime, string, Weather>();
            data.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 2), Content = "FGHIJ", Weather = Weather.Cloudy }, new DateTime(2000, 1, 2), "FGHIJ", Weather.Cloudy);
            data.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 3), Content = "", Weather = Weather.Rainy }, new DateTime(2000, 1, 3), "", Weather.Rainy);
            data.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 4), Content = new string('1', 100), Weather = Weather.Sunny }, new DateTime(2000, 1, 4), new string('1', 100), Weather.Sunny);
            return data;
        }
    }

    [Fact(DisplayName = "GetAll 01 正常 データ有り")]
    public async Task GetAll_01()
    {
        using var context = TestDbContext.CreateContext();
        context.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 2), Content = "ABCDE", Weather = Weather.Sunny });
        context.Add(new Daily { Id = 2, Date = new DateTime(2000, 1, 1), Content = "FGHIJ", Weather = Weather.Cloudy });
        context.Add(new Daily { Id = 3, Date = new DateTime(2000, 1, 3), Content = "KLMNO", Weather = Weather.Rainy });
        await context.SaveChangesAsync();

        var repository = new DailyRepository(context, Logger);
        var dailies = await repository.GetAll().ToArrayAsync();

        Assert.Equal(3, dailies?.Length);

        var daily1 = dailies!.ElementAt(0);
        Assert.Equal(2, daily1.Id);
        Assert.Equal(new DateTime(2000, 1, 1), daily1.Date);
        Assert.Equal("FGHIJ", daily1.Content);
        Assert.Equal(Weather.Cloudy, daily1.Weather);

        var daily2 = dailies!.ElementAt(1);
        Assert.Equal(1, daily2.Id);
        Assert.Equal(new DateTime(2000, 1, 2), daily2.Date);
        Assert.Equal("ABCDE", daily2.Content);
        Assert.Equal(Weather.Sunny, daily2.Weather);

        var daily3 = dailies!.ElementAt(2);
        Assert.Equal(3, daily3.Id);
        Assert.Equal(new DateTime(2000, 1, 3), daily3.Date);
        Assert.Equal("KLMNO", daily3.Content);
        Assert.Equal(Weather.Rainy, daily3.Weather);
    }

    [Fact(DisplayName = "GetAll 02 正常 データ無し")]
    public async Task GetAll_02()
    {
        using var context = TestDbContext.CreateContext();

        var repository = new DailyRepository(context, Logger);
        var dailies = await repository.GetAll().ToArrayAsync();

        Assert.Equal(0, dailies?.Length);
    }

    [Fact(DisplayName = "Get 01 正常 データ有り")]
    public async Task Get_01()
    {
        using var context = TestDbContext.CreateContext();
        context.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 1), Content = "ABCDE", Weather = Weather.Sunny });
        await context.SaveChangesAsync();

        var repository = new DailyRepository(context, Logger);
        var daily = await repository.Get(1);

        Assert.NotNull(daily);
        Assert.Equal(1, daily.Id);
        Assert.Equal(new DateTime(2000, 1, 1), daily.Date);
        Assert.Equal("ABCDE", daily.Content);
        Assert.Equal(Weather.Sunny, daily.Weather);
    }

    [Fact(DisplayName = "Get 02 例外 データ無し")]
    public async Task Get_02()
    {
        using var context = TestDbContext.CreateContext();
        context.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 1), Content = "ABCDE", Weather = Weather.Sunny });
        await context.SaveChangesAsync();

        var repository = new DailyRepository(context, Logger);

        var error = await Assert.ThrowsAsync<ApiException>(() => repository.Get(2));
        Assert.Equal(ApiExceptionType.DataNotFound.ToString(), error.ErrorCode);
    }

    [Theory(DisplayName = "Add 01 正常")]
    [MemberData(nameof(AddData))]
    public async Task Add_01(Daily model, DateTime expectedDate, string expectedContent, Weather expectedWeather)
    {
        using var context = TestDbContext.CreateContext();
        var repository = new DailyRepository(context, Logger);
        await repository.Add(model);

        var result = await context.Dailies.FirstAsync(x => x.Id == 1);
        Assert.NotNull(result);
        Assert.Equal(expectedDate, result.Date);
        Assert.Equal(expectedContent, result.Content);
        Assert.Equal(expectedWeather, result.Weather);
    }

    [Fact(DisplayName = "Add 02 例外 日付重複")]
    public async Task Add_02()
    {
        using var context = TestDbContext.CreateContext();
        context.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 1), Content = "ABCDE", Weather = Weather.Sunny });
        await context.SaveChangesAsync();

        var repository = new DailyRepository(context, Logger);
        var model = new Daily { Id = 0, Date = new DateTime(2000, 1, 1), Content = "", Weather = Weather.Cloudy };
        var error = await Assert.ThrowsAsync<ApiException>(async () => await repository.Add(model));
        Assert.Equal(ApiExceptionType.DateDuplicate.ToString(), error.ErrorCode);
    }

    /*
    [Fact(DisplayName = "Add 02 例外 文字列長超過", Skip = "sqliteではfieldの文字列長の設定が不可")] // Skip非推奨
    public async Task Add_03()
    {
        using var context = TestDbContext.CreateContext();
        var repository = new DailyRepository(context, Logger);

        var model = new Daily { Id = 0, Date = new DateTime(2000, 1, 1), Content = new string('1', 101), Weather = Weather.Sunny };
        await Assert.ThrowsAsync<Exception>(async () => await repository.Add(model));
    }
    */

    [Theory(DisplayName = "Update 01 正常")]
    [MemberData(nameof(UpdateData))]
    public async Task Update_01(Daily model, DateTime expectedDate, string expectedContent, Weather expectedWeather)
    {
        using var context = TestDbContext.CreateContext();
        context.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 1), Content = "ABCDE", Weather = Weather.Sunny });
        await context.SaveChangesAsync();

        var repository = new DailyRepository(context, Logger);
        await repository.Update(model);

        var result = await context.Dailies.FirstAsync(x => x.Id == 1);
        Assert.NotNull(result);
        Assert.Equal(expectedDate, result.Date);
        Assert.Equal(expectedContent, result.Content);
        Assert.Equal(expectedWeather, result.Weather);
    }

    [Fact(DisplayName = "Update 02 例外 日付重複")]
    public async Task Update_02()
    {
        using var context = TestDbContext.CreateContext();
        context.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 1), Content = "ABCDE", Weather = Weather.Sunny });
        context.Add(new Daily { Id = 2, Date = new DateTime(2000, 1, 2), Content = "FGHIJ", Weather = Weather.Cloudy });
        await context.SaveChangesAsync();

        var model = new Daily
        {
            Id = 2,
            Date = new DateTime(2000, 1, 1),
            Content = "FGHIJ",
            Weather = Weather.Cloudy,
        };
        var repository = new DailyRepository(context, Logger);
        var result = await Assert.ThrowsAsync<ApiException>(async () => await repository.Update(model));
        Assert.Equal(ApiExceptionType.DateDuplicate.ToString(), result.ErrorCode);
    }

    [Fact(DisplayName = "Update 03 例外 データ無し")]
    public async Task Update_03()
    {
        using var context = TestDbContext.CreateContext();

        var model = new Daily
        {
            Id = 1,
            Date = new DateTime(2000, 1, 1),
            Content = "ABCDE",
            Weather = Weather.Sunny,
        };
        var repository = new DailyRepository(context, Logger);
        var result = await Assert.ThrowsAsync<ApiException>(async () => await repository.Update(model));
        Assert.Equal(ApiExceptionType.DataNotFound.ToString(), result.ErrorCode);
    }

    /*
    [Fact(DisplayName = "Add 02 例外 文字列長超過", Skip = "sqliteではfieldの文字列長の設定が不可")] // Skip非推奨
    public async Task Update_04()
    {
        using var context = TestDbContext.CreateContext();
        context.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 1), Content = "ABCDE", Weather = Weather.Sunny });
        await context.SaveChangesAsync();

        var model = new Daily
        {
            Id = 1,
            Date = new DateTime(2000, 1, 1),
            Content = new string('1', 101),
            Weather = Weather.Sunny,
        };
        var repository = new DailyRepository(context, Logger);
        await Assert.ThrowsAsync<Exception>(async () => await repository.Update(model));
    }
    */

    [Fact(DisplayName = "Remove 01 正常")]
    public async Task Remove_01()
    {
        using var context = TestDbContext.CreateContext();
        context.Add(new Daily { Id = 1, Date = new DateTime(2000, 1, 1), Content = "ABCDE", Weather = Weather.Sunny });
        await context.SaveChangesAsync();

        var model = new Daily
        {
            Id = 1,
            Date = new DateTime(2000, 1, 1),
            Content = "ABCDE",
            Weather = Weather.Sunny,
        };
        var repository = new DailyRepository(context, Logger);
        await repository.Remove(model);

        var result = await context.Dailies.FirstOrDefaultAsync(x => x.Id == 1);
        Assert.Null(result);
    }

    [Fact(DisplayName = "Remove 02 例外 データ無し")]
    public async Task Remove_02()
    {
        using var context = TestDbContext.CreateContext();

        var model = new Daily
        {
            Id = 1,
            Date = new DateTime(2000, 1, 1),
            Content = "ABCDE",
            Weather = Weather.Sunny,
        };
        var repository = new DailyRepository(context, Logger);
        var result = await Assert.ThrowsAsync<ApiException>(async () => await repository.Remove(model));
        Assert.Equal(ApiExceptionType.DataNotFound.ToString(), result.ErrorCode);
    }
}
