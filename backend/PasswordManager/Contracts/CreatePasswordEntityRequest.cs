using PasswordManager.Models;

namespace PasswordManager.Contracts;

public record CreatePasswordEntityRequest(string Name, string Password, PasswordType Type);