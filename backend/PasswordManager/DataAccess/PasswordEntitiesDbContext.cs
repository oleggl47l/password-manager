using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PasswordManager.Models;

namespace PasswordManager.DataAccess;

public class PasswordEntitiesDbContext(IConfiguration configuration) : DbContext {
    public DbSet<PasswordEntity> PasswordEntities => Set<PasswordEntity>();
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseNpgsql(configuration.GetConnectionString("Database"));
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<PasswordEntity>()
            .Property(d => d.Type)
            .HasConversion(new EnumToStringConverter<PasswordType>());
    }
}