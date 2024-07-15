using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Contracts;
using PasswordManager.DataAccess;
using PasswordManager.Models;

namespace PasswordManager.Validators;

public class PasswordEntityRequestValidator(PasswordEntitiesDbContext dbContext)
    : IPasswordEntityRequestValidator<CreatePasswordEntityRequest> {
    public async Task<(bool isValid, string errorMessage)> ValidateAsync(CreatePasswordEntityRequest request) {
        if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Password)) {
            return (false, "Name and Password are required.");
        }

        if (request.Type == PasswordType.Email) {
            if (!IsValidEmail(request.Name)) {
                return (false, "Invalid email format.");
            }

            var emailExists = await dbContext.PasswordEntities
                .AnyAsync(pe => pe.Name == request.Name);

            if (emailExists) {
                return (false, "Email already exists.");
            }
        }
        
        if (request.Password.Length < 8) {
            return (false, "Password must be at least 8 characters long.");
        }

        if (!Enum.IsDefined(typeof(PasswordType), request.Type)) {
            return (false, "Invalid password type.");
        }

        return (true, string.Empty);
    }

    private bool IsValidEmail(string email) {
        var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        return Regex.IsMatch(email, emailPattern);
    }
}