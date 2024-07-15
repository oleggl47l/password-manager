using Microsoft.AspNetCore.Mvc;
using PasswordManager.Contracts;
using PasswordManager.DataAccess;
using PasswordManager.Models;
using PasswordManager.Services;
using PasswordManager.Validators;

namespace PasswordManager.Controllers;

[ApiController]
[Route("[controller]")]
public class PasswordEntitiesController : ControllerBase {
    private readonly PasswordEntitiesDbContext _dbContext;
    private readonly IPasswordEntityRequestValidator<CreatePasswordEntityRequest> _passwordEntityRequestValidator;
    private readonly IPasswordEntityService _passwordEntityService;

    public PasswordEntitiesController(PasswordEntitiesDbContext dbContext,
        IPasswordEntityRequestValidator<CreatePasswordEntityRequest> passwordEntityRequestValidator,
        IPasswordEntityService passwordEntityService) {
        _dbContext = dbContext;
        _passwordEntityRequestValidator = passwordEntityRequestValidator;
        _passwordEntityService = passwordEntityService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePasswordEntityRequest request,
        CancellationToken cancellationToken) {
        var (isValid, errorMessage) = await _passwordEntityRequestValidator.ValidateAsync(request);
        if (!isValid) {
            return BadRequest(errorMessage);
        }

        var passwordEntities = new PasswordEntity(request.Name, request.Password, request.Type);

        try {
            await _dbContext.PasswordEntities.AddAsync(passwordEntities, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Ok();
        }
        catch (Exception ex) {
            return StatusCode(500, "An error occurred while saving to the database.");
        }
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetPasswordEntityRequest request,
        CancellationToken cancellationToken) {
        try {
            var passwordEntityDtos = await _passwordEntityService.GetPasswordEntitiesAsync(request, cancellationToken);
            return Ok(new GetPasswordEntityResponse(passwordEntityDtos));
        }
        catch (Exception ex) {
            return StatusCode(500, "An error occurred while retrieving data.");
        }
    }
}