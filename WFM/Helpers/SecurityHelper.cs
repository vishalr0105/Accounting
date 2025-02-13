namespace EtapriseWFM.Helpers
{
    public static class SecurityHelper
    {
        public static string EncPwd(string plaintxtpwd)
        {
          
            return BCrypt.Net.BCrypt.HashPassword(plaintxtpwd);
        }
        public static bool VerifyPwd(string hashedpwd,string plaintxtpwd)
        {

            return BCrypt.Net.BCrypt.Verify(plaintxtpwd, hashedpwd);
        }
    }
}




