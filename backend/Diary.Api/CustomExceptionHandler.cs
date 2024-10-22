using Diary.Api.Models;
using Microsoft.AspNetCore.Diagnostics;

namespace Diary.Api;

/// <summary>
/// 一元化例外処理コールバック
/// </summary>
public class CustomExceptionHandler(ILogger<CustomExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var exceptionMessage = exception.Message;
        logger.LogError(
            "Error Message: {exceptionMessage}, Time of occurrence {time}",
            exceptionMessage, DateTime.UtcNow);

        object GetError()
        {
            if (exception is ApiException ex)
            {
                return ex.ErrorCode;
            }
            else if (exception.InnerException is ApiException inner)
            {
                return inner.ErrorCode;
            }

            return ApiExceptionType.Unexpected;
        }

        httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        httpContext.Response.ContentType = "application/json";
        await httpContext.Response.WriteAsJsonAsync(GetError(), cancellationToken);

        return await ValueTask.FromResult(true);
    }
}
