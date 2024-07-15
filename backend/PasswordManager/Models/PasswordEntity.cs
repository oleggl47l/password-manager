using System.ComponentModel;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace PasswordManager.Models;

public class PasswordEntity(string name, string password, PasswordType type) {
    public Guid Id { get; init; }
    public string Name { get; init; } = name;
    public string Password { get; init; } = password;
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public PasswordType Type { get; init; } = type;
}

public enum PasswordType {
    Website,
    Email,
}
