using ActivityService.Models;
using Microsoft.EntityFrameworkCore;

namespace ActivityService.Data
{
    public class ActivityDbContext : DbContext
    {
        public ActivityDbContext(DbContextOptions<ActivityDbContext> options) : base(options) { }
        public DbSet<ActivityModel> Activities { get; set; }

    }
}
