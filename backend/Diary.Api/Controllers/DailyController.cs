using Diary.Api.Entities;
using Diary.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Diary.Api.Controllers;

/// <summary>
/// DailyController
/// </summary>
[ApiController]
[Route("api/[controller]/[action]")]
public class DailyController(IDailyRepository repository) : ControllerBase
{
    /// <summary>
    /// 全件取得
    /// </summary>
    [HttpGet]
    public IAsyncEnumerable<Daily> GetAll() => repository.GetAll();

    /// <summary>
    /// 1件取得
    /// </summary>
    [HttpGet]
    public Task<Daily> Get(int id) => repository.Get(id);

    /// <summary>
    /// 登録
    /// </summary>
    [HttpPost]
    public Task Add(Daily daily) => repository.Add(daily);

    /// <summary>
    /// 更新
    /// </summary>
    [HttpPost]
    public Task Update(Daily daily) => repository.Update(daily);

    /// <summary>
    /// 削除
    /// </summary>
    [HttpPost]
    public Task Remove(Daily daily) => repository.Remove(daily);
}
