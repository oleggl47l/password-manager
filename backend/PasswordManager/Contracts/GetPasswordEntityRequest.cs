namespace PasswordManager.Contracts;

public record GetPasswordEntityRequest(string? Search, string? SortItem, string? SortOrder);