namespace UsersService.Services
{
    public interface IUserService
    {
        Task<UserModel?> Authenticate(string username, string password);
        Task<List<UserModel>> GetAllAsync();
        Task<UserModel> CreateAsync(UserModel user);
    }
}
