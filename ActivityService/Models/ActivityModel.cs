namespace ActivityService.Models
{
    public class ActivityModel
    {
        public int Id { get; set; }

        // User yang melakukan aktivitas
        public int UserId { get; set; }

        // Jenis aktivitas (Create Task, Complete Task, Login, dll)
        public string Action { get; set; } = string.Empty;

        // Entity yang terlibat (Task, User)
        public string Entity { get; set; } = string.Empty;

        // Id dari entity yang terlibat
        public int EntityId { get; set; }

        // Commit / komentar tambahan dari user (opsional)
        public string? Comment { get; set; }

        // Waktu aktivitas terjadi
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
