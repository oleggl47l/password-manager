using PasswordManager.Contracts;

namespace PasswordManager.Services;

public interface IPasswordEntityService {
    Task<List<PasswordEntityDto>> GetPasswordEntitiesAsync(GetPasswordEntityRequest request,
        CancellationToken cancellationToken);
}