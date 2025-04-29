using Microsoft.AspNetCore.Mvc;
using BankApi.Data;
using BankApi.DTOs;
using BankApi.Models;

namespace BankApi.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context) {
            _context = context;
        }

      [HttpPost("register")]
public IActionResult Register(RegisterDto dto) {
    if (string.IsNullOrEmpty(dto.FullName) || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password)) {
        return BadRequest(new { message = "All fields are required" });
    }
    
    var user = new User {
        FullName = dto.FullName,
        Email = dto.Email,
        Password = dto.Password // NOTE: Use hashing in production!
    };

    _context.Users.Add(user);
    _context.SaveChanges();
    return Ok(new { message = "Registration successful" });
}


        [HttpPost("login")]
        public IActionResult Login(LoginDto dto) {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email && u.Password == dto.Password);
            if (user == null) return Unauthorized(new { message = "Invalid credentials" });
            return Ok(new { message = "Login successful", userId = user.Id });
        }
    }
}
