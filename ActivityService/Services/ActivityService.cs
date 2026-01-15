using ActivityService.Models;
using ActivityService.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace ActivityService.Services
{
    public class ActivityService : IActivityService
    {
        private readonly ActivityDbContext _context;

        public ActivityService(ActivityDbContext context)
        {
            _context = context;
        }

        public async Task LogActivity(ActivityModel activity)
        {
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ActivityModel>> GetAllAsync()
        {
            return await _context.Activities.ToListAsync();
        }

        public async Task<List<ActivityModel>> GetByUserAsync(int userId)
        {
            return await _context.Activities.Where(a => a.UserId == userId).ToListAsync();
        }
    }
}
