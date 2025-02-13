// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

export class User {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(id?: string, userName?: string, fullName?: string, email?: string, jobTitle?: string, phoneNumber?: string, companyId?: string, userType?: string, userImage?: string, features?: string,twoFactorEnable?: string,roleName?:string,currency?:string) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.jobTitle = jobTitle;
        this.phoneNumber = phoneNumber;
        this.companyId = companyId;
        this.userType = userType;
      this.userImage = userImage;
      this.fullName = fullName;
      this.features = features;
      this.twoFactorEnable=twoFactorEnable;  
      this.roleName=roleName;
      this.currency=currency;
    }


    get friendlyName(): string {
        let name = this.fullName || this.userName;

        if (this.jobTitle) {
            name = this.jobTitle + ' ' + name;
        }

        return name;
    }


    public id: string;
    public userName: string;
    public fullName: string;
    public email: string;
    public jobTitle: string;
    public phoneNumber: string;
    public isEnabled: boolean;
    public isLockedOut: boolean;
    public roles: string[];
    public companyId: string;
    public currency:string;
    public userType: string;
  public userImage: string;
  public features: string;
  public twoFactorEnable?:string;
  public roleName?:string;
}
