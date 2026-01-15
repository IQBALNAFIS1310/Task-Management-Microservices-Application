using TaskService.Models;

public interface ITaskService
{
    Task<List<TaskModel>> GetAllAsync();
    Task<TaskModel?> GetByIdAsync(int id);
    Task<List<TaskModel>> GetByUserAsync(int userId);

    // ADMIN
    Task<TaskModel> CreateAsync(TaskModel task);

    // ADMIN UPDATE DATA TASK (title, description, dll)
    Task<bool> UpdateAsync(int id, TaskModel updatedTask);

    // USER
    Task<bool> UpdateStatusAsync(
        int taskId,
        bool isCompleted,
        int userId,
        string? comment
    );

    // ADMIN
    Task<bool> DeleteAsync(int id);
}
