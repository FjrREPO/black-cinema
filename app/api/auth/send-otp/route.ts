import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Resend } from 'resend'

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const { email, otpCode } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: 'jossfajar21@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${otpCode}`
        });

        const sendOtp = await prisma.resetPassword.create({
            data: {
                email: email,
                otp: otpCode,
                expired: new Date(Date.now() + 10 * 60 * 1000),
            },
        });

        return NextResponse.json(sendOtp);
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.error();
    }
}
