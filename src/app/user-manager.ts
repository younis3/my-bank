import { UserCredentials } from "./user-credentials";
const USER_CREDENTIALS_KY: string = "USER_CREDENTIALS";

export class UserManager {
    private static currentUser?: UserCredentials;
    private static theUserCredentials: UserCredentials = new UserCredentials("siteAdmin@bigbank.com", "1234");

    private static loadFill():void {
        if (localStorage.getItem(USER_CREDENTIALS_KY) == null) {
            localStorage.setItem(USER_CREDENTIALS_KY, JSON.stringify(UserManager.theUserCredentials));
        }
        else {
            try {
                let t:any = localStorage.getItem(USER_CREDENTIALS_KY);
                UserManager.theUserCredentials = JSON.parse(t);
            }
            catch (prblm: any) {
                localStorage.setItem(USER_CREDENTIALS_KY, JSON.stringify(UserManager.theUserCredentials));
                console.log("JSON problem: " + prblm.message);
            }
        }
    }

    static validateUser(uid?: string, pwd?: string): boolean {
        UserManager.loadFill();
        return (uid == UserManager.theUserCredentials.uid && pwd == UserManager.theUserCredentials.pwd)
    }

    static userSignedIn(): void {
        UserManager.loadFill();
        UserManager.currentUser = new UserCredentials(UserManager.theUserCredentials.uid, UserManager.theUserCredentials.pwd);
    }

    static isUserSignedIn(): boolean {

        return (UserManager.currentUser != undefined);
    }

    static byeUser(): void {
        UserManager.currentUser = undefined;
    }

    static isPwdOk(chkdpwd: string): boolean {
        UserManager.loadFill();
        return (chkdpwd == UserManager.theUserCredentials.pwd);
    }

    static changePwd(nwPwd: string): void {
        UserManager.theUserCredentials.pwd = nwPwd;
        localStorage.setItem(USER_CREDENTIALS_KY, JSON.stringify(UserManager.theUserCredentials));
    }
    
}
