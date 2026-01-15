using ActivityService.Models;

namespace ActivityService.Services
{
    public interface IActivityService
    {
        Task LogActivity(ActivityModel activity);
        Task<List<ActivityModel>> GetAllAsync();
        Task<List<ActivityModel>> GetByUserAsync(int userId);

    }
}
