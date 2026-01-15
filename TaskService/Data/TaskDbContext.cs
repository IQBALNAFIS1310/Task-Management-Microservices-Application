using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TaskService.Models;

namespace TaskService.Data;

public class TaskDbContext : DbContext
{
    public TaskDbContext(DbContextOptions<TaskDbContext> options): base(options) { }
    public DbSet<TaskModel> Tasks { get; set; }
}
