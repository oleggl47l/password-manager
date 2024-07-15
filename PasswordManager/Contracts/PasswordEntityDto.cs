namespace PasswordManager.Contracts;

public record PasswordEntityDto(Guid Id, string Name, string Password, DateTime CreatedAt, string Type);