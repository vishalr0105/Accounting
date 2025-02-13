using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models.TempModels
{
	public class invoiceMail
	{
		public Guid InvoiceId { get; set; }
		public string senderEmail { get; set; }
		public string senderName { get; set; }
		public string subject { get; set; }
		public string body { get; set; }
		public string reciepentName { get; set; }
		public string reciepentEmail { get; set; }
		public IFormFile imageFile { get; set; }
		public IFormFile image { get; set; }
		public IFormFile attachments { get; set; }
	}

}
