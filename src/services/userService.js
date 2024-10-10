const { frontendOrigin } = require("../secret");
const emailSendWithNodeMailer = require("../utils/email");

const handleForgetPassword = async(user, token) => {
    const email = user.email
    const emailData = {
        email,
        subject: "Reset Your Password",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7; border-radius: 10px; border: 1px solid #e0e0e0;">
                <div style="background-color: #007bff; color: white; padding: 20px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                    <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
                </div>
                <div style="padding: 20px; background-color: #fff;">
                    <h2 style="font-size: 20px; color: #333;">Hello ${user.name},</h2>
                    <p style="font-size: 16px; color: #555; line-height: 1.5;">
                        We received a request to reset your password. Please click the button below to reset it:
                    </p>
                    <a href="${frontendOrigin}/reset-password/${token}" style="display: inline-block; padding: 12px 20px; margin-top: 20px; background-color: #28a745; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Reset Password
                    </a>
                    <p style="font-size: 14px; color: #888; margin-top: 20px;">
                        If you did not request a password reset, please ignore this email.
                    </p>
                </div>
                <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #999; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                    &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
                </div>
            </div>
        `
    };
    
    await emailSendWithNodeMailer(emailData);
}



module.exports = {
    handleForgetPassword
  };
  