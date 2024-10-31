import nodemailer from 'nodemailer';

export async function sendResetPasswordEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    });
}
