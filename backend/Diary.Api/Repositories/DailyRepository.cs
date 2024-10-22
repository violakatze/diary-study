using Diary.Api.Contexts;
using Diary.Api.Entities;
using Diary.Api.Models;
using Google.Protobuf.Collections;
using Microsoft.EntityFrameworkCore;

namespace Diary.Api.Repositories;

/// <summary>
/// DailyRepository
/// </summary>
public interface IDailyRepository
{
    /// <summary>
    /// 全件取得
    /// </summary>
    IAsyncEnumerable<Daily> GetAll();

    /// <summary>
    /// 1件取得
    /// </summary>
    Task<Daily> Get(int id);

    /// <summary>
    /// 登録
    /// </summary>
    Task Add(Daily daily);

    /// <summary>
    /// 更新
    /// </summary>
    Task Update(Daily daily);

    /// <summary>
    /// 削除
    /// </summary>
    Task Remove(Daily daily);
}

/// <summary>
/// DailyRepository
/// </summary>
public class DailyRepository(AppDbContext context, ILogger<DailyRepository> logger) : IDailyRepository
{
    /// <summary>
    /// 全件取得
    /// </summary>
    public IAsyncEnumerable<Daily> GetAll()
        => context.Dailies.OrderBy(d => d.Date).AsAsyncEnumerable();

    /// <summary>
    /// 1件取得
    /// </summary>
    public async Task<Daily> Get(int id)
    {
        var daily = await context.Dailies.FirstOrDefaultAsync(d => d.Id == id) ?? throw new ApiException(ApiExceptionType.DataNotFound);
        return daily;
    }

    /// <summary>
    /// 登録
    /// </summary>
    public async Task Add(Daily daily)
    {
        if (await context.Dailies.FirstOrDefaultAsync(d => d.Date == daily.Date) is { } exists)
        {
            throw new ApiException(ApiExceptionType.DateDuplicate);
        }

        context.Dailies.Add(daily);
        await context.SaveChangesAsync();
    }

    /// <summary>
    /// 更新
    /// </summary>
    /// <remarks>排他制御はしてない</remarks>
    public async Task Update(Daily daily)
    {
        if (await context.Dailies.FirstOrDefaultAsync(d => d.Id != daily.Id && d.Date == daily.Date) is { } exists)
        {
            throw new ApiException(ApiExceptionType.DateDuplicate);
        }

        var entity = await context.Dailies.FirstOrDefaultAsync(d => d.Id == daily.Id) ?? throw new ApiException(ApiExceptionType.DataNotFound);

        entity.Date = daily.Date;
        entity.Content = daily.Content;
        entity.Weather = daily.Weather;
        context.Update(entity);

        await context.SaveChangesAsync();
    }

    /// <summary>
    /// 削除
    /// </summary>
    /// <remarks>排他制御はしていない</remarks>
    public async Task Remove(Daily daily)
    {
        var entity = await context.Dailies.FirstOrDefaultAsync(d => d.Id == daily.Id) ?? throw new ApiException(ApiExceptionType.DataNotFound);

        context.Remove(entity);

        await context.SaveChangesAsync();
    }
}
