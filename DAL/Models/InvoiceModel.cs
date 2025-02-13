using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Principal;

namespace DAL.Models
{
	public class InvoiceModel : BaseEntity
	{
		public AccountTable customer { get; set; }
		public Guid? customerId { get; set; }
		public string poNumber { get; set; }
		public string InvoiceNu { get; set; }
		public DateTime invoiceDate { get; set; }
		public DateTime DueDate { get; set; }
		public Guid? quoteId { get; set; }
		public string paymentTerms { get; set; }
		public string currencyType { get; set; }
		public double amount { get; set; }
		public double amountDue { get; set; }
		public string remarks { get; set; }
		public string paymentStatus { get; set; }
		public string invoiceStatus { get; set; }
		public bool sendToUser { get; set; }
		public Guid? CompanyId { get; set; }
		public virtual Company Company { get; set; }
		public Guid? WorkOrderId { get; set; }
		public Guid? TechnicianId { get; set; }
		public string attachmentsPath { get; set; }
        public string paymentsessionId { get; set; }
        public bool? IsDeleted { get; set; }
	}

	public class InvoiceModelDto : BaseEntity
	{
		public string customerName { get; set; }
		public Guid? customerId { get; set; }
		public string email { get; set; }
		public string Address { get; set; }
		public string poNumber { get; set; }
		public string InvoiceNu { get; set; }
		public DateTime invoiceDate { get; set; }
		public DateTime DueDate { get; set; }
		public Guid? quoteId { get; set; }
		public Guid? jobId { get; set; }
		public string paymentTerms { get; set; }
		public string currencyType { get; set; }
		public double amount { get; set; }
		public double amountDue { get; set; }
		public string remarks { get; set; }
		public string paymentStatus { get; set; }
		public string invoiceStatus { get; set; }
		public bool sendToUser { get; set; }
		public Guid? CompanyId { get; set; }
		public Guid? WorkOrderId { get; set; }
		public string attachmentsPath { get; set; }
	}

	public class CreditNote : BaseEntity
	{
		public string creditNoteNo { get; set; }
		public DateTime creationDate { get; set; }
		public InvoiceModel Invoice { get; set; }
		public Guid InvoiceId { get; set; }
		public string reason { get; set; }
	//	public ApplicationUser salesPerson { get; set; }
		public string salesPersonId { get; set; }
		public float amount { get; set; }
		public float totalDiscount { get; set; }
		public string customersNotes { get; set; }
		public Guid? CompanyId { get; set; }
		public virtual Company Company { get; set; }
		public float amountAfterDiscount { get; set; }
    }

	public class CreditNoteDto
	{
		public CreditNote CreditNote { get; set; }
        public string SalesPerson { get; set; }
	}

	public class InvoiceAttachments
	{
		public Guid invoiceId { get; set; }
		public string folderName { get; set; }
		public List<IFormFile> files { get; set; }
	}

	public class sendCreditNote
	{
		public string subject { get; set; }
		public string body { get; set; }
		public string reciepentEmail { get; set; }
		public IFormFile creditNotePdf { get; set; }
		public IFormFile creditNoteImage { get; set; }

	}


	public class InvoiceDto
	{
		public InvoiceModel invoiceData { get; set; }
		public List<services> items { get; set; }
	}

	public class InvoiceReturnDto
	{
		public InvoiceModelDto invoiceData { get; set; }
		public List<services> items { get; set; }

	}

	public class services
	{
		public string id { get; set; }
		public DateTime ServiceDate { get; set; }
		public string serviceName { get; set; }
		public string description { get; set; }
		public int quantity { get; set; }
		public float unitCost { get; set; }
		public float tax { get; set; }
		public float sellCost { get; set; }
		public float amount { get; set; }
	}

}


