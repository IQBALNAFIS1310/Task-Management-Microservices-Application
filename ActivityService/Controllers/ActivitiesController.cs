using Microsoft.AspNetCore.Mvc;
using ActivityService.Models;
using ActivityService.Services;
using System.Threading.Tasks;

namespace ActivityService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly IActivityService _service;

        public ActivitiesController(IActivityService service)
        {
            _service = service;
        }

        // POST api/activities
        [HttpPost]
        public async Task<IActionResult> Log([FromBody] ActivityModel activity)
        {
            await _service.LogActivity(activity);
            return Ok(activity);
        }

        // GET api/activities
        [HttpGet]
        public async Task<List<ActivityModel>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET api/activities/user/1
        [HttpGet("user/{userId}")]
        public async Task<List<ActivityModel>> GetByUser(int userId)
        {
            return await _service.GetByUserAsync(userId);
        }
    }
}
