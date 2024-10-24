export interface ResetPasswordRequest{
    email: String,
    otp: number,
    newPassword: String
}