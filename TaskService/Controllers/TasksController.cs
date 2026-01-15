using Microsoft.AspNetCore.Mvc;
using TaskService.Models;
using TaskService.Services;

namespace TaskService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _service;
        public TaskController(ITaskService service)
        {
            _service = service;
        }

        // ADMIN
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        // USER
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
            => Ok(await _service.GetByUserAsync(userId));

        // ADMIN
        [HttpPost]
        public async Task<IActionResult> Create(TaskModel task)
            => Ok(await _service.CreateAsync(task));

        // ADMIN UPDATE TASK DATA
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaskModel task)
        {
            var success = await _service.UpdateAsync(id, task);
            return success ? Ok() : NotFound();
        }

        // USER - update status + commit
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(
            int id,
            [FromBody] UpdateStatusRequest request)
        {
            var success = await _service.UpdateStatusAsync(
                id,
                request.IsCompleted,
                request.UserId,
                request.Comment
            );

            return success ? Ok() : NotFound();
        }

        // ADMIN
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? Ok() : NotFound();
        }
    }

    // DTO KHUSUS STATUS + COMMIT
    public class UpdateStatusRequest
    {
        public bool IsCompleted { get; set; }
        public int UserId { get; set; }
        public string? Comment { get; set; }
    }
}
