using Microsoft.EntityFrameworkCore;
using BankApi.Models;

namespace BankApi.Data {
    public class AppDbContext : DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Transaction> Transactions => Set<Transaction>();
        public DbSet<Account> Accounts => Set<Account>();
    }
}
