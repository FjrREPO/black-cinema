import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token, newPassword } = req.body;

    const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token },
    });

    if (!resetToken || resetToken.expires < new Date()) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
        where: { token },
    });

    res.status(200).json({ message: 'Password reset successful' });
}

export { handler as DELETE, handler as POST, handler as GET };