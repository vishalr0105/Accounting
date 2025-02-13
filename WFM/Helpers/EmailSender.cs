// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using MailKit.Net.Smtp;
using MimeKit;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;
using Microsoft.Extensions.Options;

namespace WFM.Helpers
{
    public interface IEmailSender
	{
		Task<(bool success, string errorMsg)> SendEmailAsync(MailboxAddress sender, MailboxAddress[] recepients, string subject, string body, SmtpConfig config = null, bool isHtml = true);
		Task<(bool success, string errorMsg)> SendEmailAsync(string recepientName, string recepientEmail, string subject, string body, SmtpConfig config = null, bool isHtml = true);
		Task<(bool success, string errorMsg)> SendEmailAsync(string senderName, string senderEmail, string recepientName, string recepientEmail, string subject, string body, SmtpConfig config = null, bool isHtml = true);
		Task<(bool success, string errorMsg)> SendEmailAsync(IFormFile image, IFormFile filePath, string senderName, string senderEmail, string recepientName, string recepientEmail, string subject, string body, SmtpConfig config = null, bool isHtml = true);
		Task<(bool success, string errorMsg)> SendEmailAsync(IFormFile image, IFormFile filePath, string path, string senderName, string senderEmail, string recepientName, string recepientEmail, string subject, string body, SmtpConfig config = null, bool isHtml = true);
	}

	public class EmailSender : IEmailSender
	{
		readonly SmtpConfig _config;
		readonly ILogger _logger;
		private readonly IWebHostEnvironment _hostingEnvironment;

		public EmailSender(IOptions<AppSettings> config, ILogger<EmailSender> logger, IWebHostEnvironment hostingEnvironment)
		{
			_config = config.Value.SmtpConfig;
			_logger = logger;
			_hostingEnvironment = hostingEnvironment;
		}


		public async Task<(bool success, string errorMsg)> SendEmailAsync(
			string recepientName,
			string recepientEmail,
			string subject,
			string body,
			SmtpConfig config = null,
			bool isHtml = true)
		{
			var from = new MailboxAddress(_config.Name, _config.EmailAddress);
			var to = new MailboxAddress(recepientName, recepientEmail);

			return await SendEmailAsync(from, new MailboxAddress[] { to }, subject, body, config, isHtml);
		}



		public async Task<(bool success, string errorMsg)> SendEmailAsync(
			string senderName,
			string senderEmail,
			string recepientName,
			string recepientEmail,
			string subject,
			string body,
			SmtpConfig config = null,
			bool isHtml = true)
		{
			var from = new MailboxAddress(senderName, senderEmail);
			var to = new MailboxAddress(recepientName, recepientEmail);

			return await SendEmailAsync(from, new MailboxAddress[] { to }, subject, body, config, isHtml);
		}


		//For background tasks such as sending emails, its good practice to use job runners such as hangfire https://www.hangfire.io
		//or a service such as SendGrid https://sendgrid.com/
		public async Task<(bool success, string errorMsg)> SendEmailAsync(
			MailboxAddress sender,
			MailboxAddress[] recepients,
			string subject,
			string body,
			SmtpConfig config = null,
			bool isHtml = true)
		{
			MimeMessage message = new MimeMessage();
			message.From.Add(sender);
			message.To.AddRange(recepients);
			message.Subject = subject;
			message.Body = isHtml ? new BodyBuilder { HtmlBody = body }.ToMessageBody() : new TextPart("plain") { Text = body };

			try
			{
				if (config == null)
					config = _config;

				using (var client = new SmtpClient())
				{
					if (!config.UseSSL)
						client.ServerCertificateValidationCallback = (object sender2, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) => true;

					await client.ConnectAsync(config.Host, config.Port, config.UseSSL).ConfigureAwait(false);
					client.AuthenticationMechanisms.Remove("XOAUTH2");

					if (!string.IsNullOrWhiteSpace(config.Username))
						await client.AuthenticateAsync(config.Username, config.Password).ConfigureAwait(false);

					await client.SendAsync(message).ConfigureAwait(false);
					await client.DisconnectAsync(true).ConfigureAwait(false);
				}

				return (true, null);
			}
			catch (Exception ex)
			{
				_logger.LogError(LoggingEvents.SEND_EMAIL, ex, "An error occurred while sending email");
				return (false, ex.Message);
			}
		}


		public async Task<(bool success, string errorMsg)> SendEmailAsync(
			IFormFile image,
			IFormFile attachment,
			MailboxAddress sender,
			MailboxAddress[] recepients,
			string subject,
			string body,
			SmtpConfig config = null,
			bool isHtml = true)
		{
			MimeMessage message = new MimeMessage();
			message.From.Add(sender);
			message.To.AddRange(recepients);
			message.Subject = subject;
			var bodyBuilder = new BodyBuilder();
			byte[] imageBytes;

			using (var memoryStream = new MemoryStream())
			{
				image.CopyTo(memoryStream);
				imageBytes = memoryStream.ToArray();
			}

			var inlineAttachment = new MimePart("image", "png")
			{
				Content = new MimeContent(new MemoryStream(imageBytes), ContentEncoding.Default),
				ContentDisposition = new ContentDisposition(ContentDisposition.Inline),
				ContentTransferEncoding = ContentEncoding.Base64,
				ContentId = "<userImage>"
			};

			// Generate the email's HTML content with the embedded image
			string emailBody = $@"
            <h1>Hello, !</h1>
            <h4>{body}</h4>
            <img src='cid:userImage' alt='User Image' width='100%' height='auto'>";

			bodyBuilder.HtmlBody = emailBody;

			// Add the inline attachment to the LinkedResources collection
			bodyBuilder.LinkedResources.Add(inlineAttachment);

			bodyBuilder.Attachments.Add(attachment.FileName, attachment.OpenReadStream());

			message.Body = bodyBuilder.ToMessageBody();
			try
			{
				if (config == null)
					config = _config;

				using (var client = new SmtpClient())
				{
					if (!config.UseSSL)
						client.ServerCertificateValidationCallback = (object sender2, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) => true;

					await client.ConnectAsync(config.Host, config.Port, config.UseSSL).ConfigureAwait(false);
					client.AuthenticationMechanisms.Remove("XOAUTH2");

					if (!string.IsNullOrWhiteSpace(config.Username))
						await client.AuthenticateAsync(config.Username, config.Password).ConfigureAwait(false);

					await client.SendAsync(message).ConfigureAwait(false);
					await client.DisconnectAsync(true).ConfigureAwait(false);
				}

				return (true, null);
			}
			catch (Exception ex)
			{
				_logger.LogError(LoggingEvents.SEND_EMAIL, ex, "An error occurred while sending email");
				return (false, ex.Message);
			}
		}

		public async Task<(bool success, string errorMsg)> SendEmailAsync(
			IFormFile image,
			IFormFile attachment,
			string path,
			MailboxAddress sender,
			MailboxAddress[] recepients,
			string subject,
			string body,
             string reciepentName,
            SmtpConfig config = null,
			bool isHtml = true)
		{
			MimeMessage message = new MimeMessage();
			message.From.Add(sender);
			message.To.AddRange(recepients);
			message.Subject = subject;
		
			var bodyBuilder = new BodyBuilder();
			byte[] imageBytes;
			


			using (var memoryStream = new MemoryStream())
			{
				image.CopyTo(memoryStream);
				imageBytes = memoryStream.ToArray();
			}

			var inlineAttachment = new MimePart("image", "png")
			{
				Content = new MimeContent(new MemoryStream(imageBytes), ContentEncoding.Default),
				ContentDisposition = new ContentDisposition(ContentDisposition.Inline),
				ContentTransferEncoding = ContentEncoding.Base64,
				ContentId = "<userImage>"
			};

			// Generate the email's HTML content with the embedded image
			string emailBody = $@"
            <h1>Hello, {reciepentName}</h1>
            <h4>{body}</h4>
            <img src='cid:userImage' alt='User Image' width='100%' height='auto'>";

			bodyBuilder.HtmlBody = emailBody;

			// Add the inline attachment to the LinkedResources collection
			bodyBuilder.LinkedResources.Add(inlineAttachment);

			bodyBuilder.Attachments.Add(attachment.FileName, attachment.OpenReadStream());
			if (Directory.Exists(path))
			{
				string[] allFiles = Directory.GetFiles(path);
			foreach (var attachmentPath in allFiles)
			{
				var attachment2 = new MimePart("application", "pdf")
				{
					Content = new MimeContent(File.OpenRead(attachmentPath)),
					ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
					ContentTransferEncoding = ContentEncoding.Base64,
					FileName = Path.GetFileName(attachmentPath)
				};

				bodyBuilder.Attachments.Add(attachment2);
			}
			}


			message.Body = bodyBuilder.ToMessageBody();
			try
			{
				if (config == null)
					config = _config;

				using (var client = new SmtpClient())
				{
					if (!config.UseSSL)
						client.ServerCertificateValidationCallback = (object sender2, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) => true;

					await client.ConnectAsync(config.Host, config.Port, config.UseSSL).ConfigureAwait(false);
					client.AuthenticationMechanisms.Remove("XOAUTH2");

					if (!string.IsNullOrWhiteSpace(config.Username))
						await client.AuthenticateAsync(config.Username, config.Password).ConfigureAwait(false);

					await client.SendAsync(message).ConfigureAwait(false);
					await client.DisconnectAsync(true).ConfigureAwait(false);
				}

				return (true, null);
			}
			catch (Exception ex)
			{
				_logger.LogError(LoggingEvents.SEND_EMAIL, ex, "An error occurred while sending email");
				return (false, ex.Message);
			}
		}


		public async Task<(bool success, string errorMsg)> SendEmailAsync(IFormFile image, IFormFile filePath, string senderName, string senderEmail, string recepientName, string recepientEmail, string subject, string body, SmtpConfig config = null, bool isHtml = true)
		{
			var from = new MailboxAddress(senderName, senderEmail);
			var to = new MailboxAddress(recepientName, recepientEmail);

			return await SendEmailAsync(image, filePath, from, new MailboxAddress[] { to }, subject, body, config, isHtml);
		}

		public async Task<(bool success, string errorMsg)> SendEmailAsync(IFormFile image, IFormFile filePath, string path, string senderName, string senderEmail, string recepientName, string recepientEmail, string subject, string body, SmtpConfig config = null, bool isHtml = true)
		{
			var from = new MailboxAddress(senderName, senderEmail);
			var to = new MailboxAddress(recepientName, recepientEmail);

			return await SendEmailAsync(image, filePath, path, from, new MailboxAddress[] { to }, subject, body,recepientName, config, isHtml);
		}
	}
}