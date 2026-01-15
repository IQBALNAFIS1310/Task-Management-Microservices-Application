using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TaskService.Data;
using TaskService.Models;

namespace TaskService.Services
{
    public class TaskService : ITaskService
    {
        private readonly TaskDbContext _context;
        private readonly HttpClient _httpClient;

        public TaskService(TaskDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }

        public async Task<List<TaskModel>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskModel?> GetByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<List<TaskModel>> GetByUserAsync(int userId)
        {
            return await _context.Tasks
                .Where(t => t.AssignedToUserId == userId)
                .ToListAsync();
        }

        // ADMIN CREATE TASK
        public async Task<TaskModel> CreateAsync(TaskModel task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            await LogActivity(
                task.AssignedToUserId,
                "Assign Task",
                "Task",
                task.Id,
                "Task diberikan oleh admin"
            );

            return task;
        }

        // ADMIN UPDATE TASK DATA
        public async Task<bool> UpdateAsync(int id, TaskModel updatedTask)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return false;

            // Update hanya data task (BUKAN status user)
            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;

            await _context.SaveChangesAsync();

            // Log activity khusus admin update
            await LogActivity(
                task.AssignedToUserId,
                "Update Task",
                "Task",
                task.Id,
                "Task diperbarui oleh admin"
            );

            return true;
        }

        // USER UPDATE STATUS + COMMIT
        public async Task<bool> UpdateStatusAsync(
            int taskId,
            bool isCompleted,
            int userId,
            string? comment)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return false;

            task.IsCompleted = isCompleted;
            await _context.SaveChangesAsync();

            await LogActivity(
                userId,
                isCompleted ? "Complete Task" : "Reopen Task",
                "Task",
                taskId,
                comment
            );

            return true;
        }

        // ADMIN DELETE
        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            await LogActivity(
                task.AssignedToUserId,
                "Delete Task",
                "Task",
                id,
                "Task dihapus oleh admin"
            );

            return true;
        }

        // =============================
        private async Task LogActivity(
            int userId,
            string action,
            string entity,
            int entityId,
            string? comment)
        {
            var log = new
            {
                userId,
                action,
                entity,
                entityId,
                comment
            };

            var json = new StringContent(
                JsonSerializer.Serialize(log),
                Encoding.UTF8,
                "application/json"
            );

            await _httpClient.PostAsync(
                "http://localhost:5148/api/activities",
                json
            );
        }
    }
}
