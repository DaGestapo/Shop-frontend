

export interface UserI {
    id: string;
    username: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
    balance: string;
  }
  
  export interface RegistrationDataI {
    username: string;
    email: string;
    password: string;
    passwordAgain: string;
    isEqualPassword: boolean;
  }

  export interface LoginDataI {
    email: string;
    password: string;
  }

  export interface InitStateI {
    auth: boolean;
    admin: boolean;
    user: UserI | null;
}