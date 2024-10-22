using Diary.Api.Repositories;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Diary.Api;

public static class DependencyInjection
{
    /// <summary>
    /// repository interfaceをDI登録
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection RegisterRepositories(this IServiceCollection services)
    {
        var types = typeof(MigrationRepository).Assembly.ExportedTypes.Where(t => t.IsClass && t.Name.EndsWith("Repository")).ToArray();
        foreach (var type in types)
        {
            var interfaceName = $"I{type.Name}";
            var interfaceType = type.GetInterface(interfaceName);
            if (interfaceType != null)
            {
                services.TryAddScoped(interfaceType, type);
            }
        }

        return services;
    }
}
