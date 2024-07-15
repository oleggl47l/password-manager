using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Contracts;
using PasswordManager.DataAccess;
using PasswordManager.Models;

namespace PasswordManager.Services;

public class PasswordEntityService(PasswordEntitiesDbContext dbContext) : IPasswordEntityService {
    public async Task<List<PasswordEntityDto>> GetPasswordEntitiesAsync(GetPasswordEntityRequest request,
        CancellationToken cancellationToken) {
        var passwordEntitiesQuery = dbContext.PasswordEntities
            .Where(pe => string.IsNullOrWhiteSpace(request.Search) ||
                         pe.Name.ToLower().Contains(request.Search.ToLower()));

        Expression<Func<PasswordEntity, object>> selectorKey = request.SortItem?.ToLower() switch {
            "id" => passwordEntity => passwordEntity.Id,
            "name" => passwordEntity => passwordEntity.Name,
            "type" => passwordEntity => passwordEntity.Type,
            _ => passwordEntity => passwordEntity.CreatedAt
        };

        passwordEntitiesQuery = request.SortOrder == "desc"
            ? passwordEntitiesQuery.OrderByDescending(selectorKey)
            : passwordEntitiesQuery.OrderBy(selectorKey);

        return await passwordEntitiesQuery
            .Select(pe => new PasswordEntityDto(pe.Id, pe.Name, pe.Password, pe.CreatedAt, pe.Type.ToString()))
            .ToListAsync(cancellationToken);
    }
}