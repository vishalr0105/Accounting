﻿// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

namespace WFM
{
    public class AppSettings
    {
        public SmtpConfig SmtpConfig { get; set; }
    }

    public class SmtpConfig
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public bool UseSSL { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
    }
}
