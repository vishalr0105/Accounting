// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

export class UserLogin {
    constructor(userName?: string, password?: string, rememberMe?: boolean,otp?:string) {
        this.userName = userName;
        this.password = password;
        this.rememberMe = rememberMe;
        this.otp=otp;
    
    }

    userName: string;
    password: string;
    rememberMe: boolean;
    otp?:string;
}
