'use client';

import { CircleUserRound } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";

const UserButton: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div className="flex gap-4 ml-auto items-center w-full">
                {session?.user ? (
                    <>
                        <Image
                            src={session.user.image ?? ""}
                            alt={session.user.name ?? ""}
                            className="rounded-full w-9 h-9"
                            width={32}
                            height={32}
                        />
                        <button
                            onClick={() => signOut()}
                            className="text-white text-sm bg-red-700 p-2 rounded"
                            type="button"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Button onClick={() => signIn()} type="button" className="text-white w-fit" variant={'outline'}>
                        <CircleUserRound className="w-9 h-9 duration-300" />
                    </Button>
                )}
        </div>
    );
};

export default UserButton;
