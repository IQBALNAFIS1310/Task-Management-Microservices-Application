using System.ComponentModel.DataAnnotations.Schema;

public class UserModel
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty; // simple hash nanti
    public string FullName { get; set; } = string.Empty;

    [NotMapped]
    public string? Token { get; set; }
}
