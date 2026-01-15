using Microsoft.EntityFrameworkCore;

namespace UsersService.Services
{
    public class UserService : IUserService
    {
        private readonly UsersDbContext _context;
        public UserService(UsersDbContext context) { _context = context; }

        public async Task<UserModel?> Authenticate(string username, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
        }

        public async Task<List<UserModel>> GetAllAsync() => await _context.Users.ToListAsync();

        public async Task<UserModel> CreateAsync(UserModel user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            user.Password = null; // jangan kirim password
            return user;
        }
    }
}
