export interface register {
  NameU: string;
  UserName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  PhoneNumber: string;
  Address: string;
  ProfileImage: File;
}
export interface login {
  userName: string | undefined;
  password: string | undefined;
}
