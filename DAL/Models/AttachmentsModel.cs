using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
	public class AttachmentsModel
	{
		public Guid Id { get; set; }
		public string folderName { get; set; }
		public List<IFormFile> files { get; set; }
	}
}
