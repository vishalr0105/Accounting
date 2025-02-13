using System.ComponentModel.DataAnnotations;

namespace WFM.ViewModels.Dtos
{
    public class UserAuthDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public Guid CompanyId { get; set; }
    }

    public class EmailVerifyDto
    {
        [Required]
        public string UserId { get; set; }
    }
}
