export interface ssoData {
  email?: string;
  SSO: string;
  facebookId?: number;
  googleId?: number;
  userName: string | null;
  name: string | null;
}

export interface loginData {
  email: string;
  password: string;
}

export interface signupData {
  email: string;
  password: string;
  name: string,
  username: string
}
export interface resetPassword {
  email: string;
  otp: number;
  password: string;
}

export interface OTPData {
  email: string;
  otp: number;
  type: string;
}

export interface generateOTP {
  email: string;
  type: string;
}

export interface user {
  email?: string;
  accessToken: string;
  name: string;
  userName: string;
}
