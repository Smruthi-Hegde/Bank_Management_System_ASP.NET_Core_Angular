using Microsoft.AspNetCore.Mvc;
using BankApi.Data;
using BankApi.Models;

namespace BankApi.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase {
        private readonly AppDbContext _context;

        public AccountsController(AppDbContext context) {
            _context = context;
        }
        [HttpGet("balance")]
        public IActionResult GetAccountBalance()
        {
            var account = _context.Accounts.FirstOrDefault(); 
            if (account == null)
            {
                return NotFound("Account not found");
            }

            return Ok(account.Balance); // Return the balance
        }

        [HttpGet]
        public IActionResult GetAccounts() => Ok(_context.Accounts.ToList());

        [HttpPost]
        public IActionResult Create(Account account) {
            _context.Accounts.Add(account);
            _context.SaveChanges();
            return Ok(account);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Account updated) {
            var account = _context.Accounts.Find(id);
            if (account == null) return NotFound();
            account.Balance = updated.Balance;
            account.AccountHolder = updated.AccountHolder;
            _context.SaveChanges();
            return Ok(account);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var account = _context.Accounts.Find(id);
            if (account == null) return NotFound();
            _context.Accounts.Remove(account);
            _context.SaveChanges();
            return Ok(new { message = "Deleted" });
        }
    }
}
