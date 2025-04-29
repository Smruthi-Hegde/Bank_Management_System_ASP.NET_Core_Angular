using Microsoft.AspNetCore.Mvc;
using BankApi.Data;
using BankApi.Models;
using BankApi.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BankApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/transactions/credit
        [HttpPost("credit")]
        public async Task<IActionResult> Credit(TransactionDto dto)
        {
            // Validate DTO (example)
            if (dto.Amount <= 0 || string.IsNullOrEmpty(dto.ReceiverAccount))
            {
                return BadRequest("Invalid transaction data.");
            }

            var transaction = new Transaction
            {
                SenderAccount = "Bank",
                ReceiverAccount = dto.ReceiverAccount,
                Amount = dto.Amount,
                Date = DateTime.Now
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = transaction.Id }, transaction); // 201 Created
        }

        // POST: api/transactions/debit
        // [HttpPost("debit")]
        // public async Task<IActionResult> Debit(TransactionDto dto)
        // {
        //     // Validate DTO (example)
        //     if (dto.Amount <= 0 || string.IsNullOrEmpty(dto.SenderAccount))
        //     {
        //         return BadRequest("Invalid transaction data.");
        //     }

        //     var transaction = new Transaction
        //     {
        //         SenderAccount = dto.SenderAccount,
        //         ReceiverAccount = "Bank",
        //         Amount = dto.Amount,
        //         Date = DateTime.Now
        //     };

        //     _context.Transactions.Add(transaction);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction(nameof(GetAll), new { id = transaction.Id }, transaction); // 201 Created
        // }

        // POST: api/transactions/debit
[HttpPost("debit")]
public async Task<IActionResult> Debit(TransactionDto dto)
{
    // Validate DTO (example)
    if (dto.Amount <= 0 || string.IsNullOrEmpty(dto.SenderAccount) || string.IsNullOrEmpty(dto.ReceiverAccount))
    {
        return BadRequest("Invalid transaction data.");
    }

    var transaction = new Transaction
    {
        SenderAccount = dto.SenderAccount,     // Use the senderAccount from the DTO
        ReceiverAccount = dto.ReceiverAccount, // Use the receiverAccount from the DTO
        Amount = dto.Amount,
        Date = DateTime.Now
    };

    _context.Transactions.Add(transaction);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetAll), new { id = transaction.Id }, transaction); // 201 Created
}


        // GET: api/transactions
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transactions = await _context.Transactions.ToListAsync();
            return Ok(transactions); // 200 OK
        }
    }
}
