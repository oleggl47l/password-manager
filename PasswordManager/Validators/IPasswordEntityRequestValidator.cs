namespace PasswordManager.Validators;

public interface IPasswordEntityRequestValidator<T> {
    Task<(bool isValid, string errorMessage)> ValidateAsync(T request);
}