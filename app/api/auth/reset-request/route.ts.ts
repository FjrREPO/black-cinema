import prisma from '@/lib/prisma';
import { sendResetPasswordEmail } from '@/lib/mail';
import { v4 as uuidv4 } from 'uuid';
import { addHours } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: 'Email is required.' });
            }

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const token = uuidv4();
            const expires = addHours(new Date(), 1);

            await prisma.passwordResetToken.create({
                data: {
                    token,
                    userId: user.id,
                    expires,
                },
            });

            await sendResetPasswordEmail(user.email || '', token);

            return res.status(200).json({ message: 'Reset password email sent successfully.' });
        } catch (error) {
            console.error('Error processing request:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}

export { handler as GET, handler as POST };