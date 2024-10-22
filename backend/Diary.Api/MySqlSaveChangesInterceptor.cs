using Diary.Api.Models;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Diary.Api;

public class MySqlSaveChangesInterceptor() : SaveChangesInterceptor
{
    public override Task SaveChangesFailedAsync(DbContextErrorEventData eventData, CancellationToken cancellationToken = default)
    {
        // logger.LogError(eventData.Exception?.Message);
        throw new ApiException(ApiExceptionType.SaveChanges);
    }

    public override ValueTask<InterceptionResult> ThrowingConcurrencyExceptionAsync(ConcurrencyExceptionEventData eventData, InterceptionResult result, CancellationToken cancellationToken = default)
    {
        // logger.LogError(eventData.Exception?.Message);
        throw new ApiException(ApiExceptionType.SaveChanges);
    }
}
