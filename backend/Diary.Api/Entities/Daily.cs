using Diary.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace Diary.Api.Entities;


/// <summary>
/// 日次の記録
/// </summary>
public class Daily
{
    /// <summary>
    /// ID
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// 日付(ユニーク制約をつける)
    /// </summary>
    public required DateTime Date { get; set; }

    /// <summary>
    /// 内容
    /// </summary>
    [MaxLength(100)]
    public required string Content { get; set; }

    /// <summary>
    /// 天気
    /// </summary>
    public required Weather Weather { get; set; }
}
