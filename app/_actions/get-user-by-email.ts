import prisma from "@/lib/prisma";


export const findUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    } catch (err) {
        return null;
    }
};

// find user by id

export const findUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    } catch (err) {
        return null;
    }
};
