using Diary.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Diary.Api.Controllers;

/// <summary>
/// MigrationController
/// </summary>
[ApiController]
[Route("api/[controller]/[action]")]
public class MigrationController(IMigrationRepository repository) : ControllerBase
{
    /// <summary>
    /// migration実行
    /// </summary>
    /// <returns></returns>
    [HttpPost]
    public Task Migrate() => repository.Migrate();
}
