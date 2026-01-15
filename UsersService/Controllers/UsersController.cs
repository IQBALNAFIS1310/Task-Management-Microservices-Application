using Microsoft.AspNetCore.Mvc;
using UsersService.Services;

namespace UsersService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;
        public UsersController(IUserService service) { _service = service; }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModel login)
        {
            var user = await _service.Authenticate(login.Username, login.Password);
            if (user == null) return Unauthorized();
            user.Password = null; // jangan kirim password
            user.Token = "dummy-token-123";
            return Ok(user); // nanti bisa diganti JWT token
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserModel user)
        {
            try
            {
                var createdUser = await _service.CreateAsync(user);
                createdUser.Password = null;
                createdUser.Token = "dummy-token"; // optional
                return Ok(createdUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());
    }
}
