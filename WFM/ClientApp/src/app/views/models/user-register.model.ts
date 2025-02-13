
export class UserRegister {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(userName?: string, password?: string, fullName?: string, email?: string, roles?: string[], companyId?: string, companyName?:string) {

    // this.id = id;
    this.userName = userName;
    this.fullName = fullName;
    this.email = email;
    this.newPassword = password;
    // this.jobTitle = jobTitle;
    // this.phoneNumber = phoneNumber;
    this.roles = roles;
    this.companyId = companyId;
    this.companyName = companyName;

  }


  get friendlyName(): string {
    let name = this.fullName || this.userName;

    //if (this.jobTitle) {
    //    name = this.jobTitle + ' ' + name;
    //}

    return name;
  }


  //public id?: string;
  public userName: string;
  public newPassword: string;
  public fullName?: string;
  public email: string;
  //public jobTitle?: string;
  public phoneNumber?: string;
  //public isEnabled?: boolean;
  //public isLockedOut?: boolean;
  public roles: string[];
  public companyId?: string;
  public companyName: string;

}
