namespace Diary.Api.Models;

/// <summary>
/// APIエラー
/// </summary>
public class ApiException(ApiExceptionType exceptionType) : Exception
{
    public string ErrorCode { get; } = exceptionType.ToString();
}

/// <summary>
/// APIエラー種別
/// </summary>
public enum ApiExceptionType
{
    /// <summary>
    /// 不明エラー
    /// </summary>
    Unexpected,

    /// <summary>
    /// DB保存時のエラー(細かい分類はしてない)
    /// </summary>
    SaveChanges,

    /// <summary>
    /// 対象データが存在しないエラー
    /// </summary>
    DataNotFound,

    /// <summary>
    /// 日付重複エラー(DateがUniqueIndexになってる)
    /// </summary>
    DateDuplicate,
}
