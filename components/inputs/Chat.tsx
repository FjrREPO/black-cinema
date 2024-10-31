import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Send } from "lucide-react";
import { Separator } from "../ui/separator";

function Chat({ isOpenChat, setIsOpenChat }: { isOpenChat: boolean, setIsOpenChat: any }) {
    return (
        <Dialog open={isOpenChat} onOpenChange={setIsOpenChat}>
            <DialogContent className="max-h-[60vh] w-full h-full">
                <div className="flex flex-col w-full h-full justify-between relative">
                    <div className="flex flex-col gap-2 w-full h-full">
                        <DialogTitle>Live Chat</DialogTitle>
                        <DialogDescription>
                            Ada masalah? Chat dengan customer service kami
                        </DialogDescription>
                        <Separator className="bg-gray-700 dark:bg-white mt-3"/>
                    </div>
                    <div className="flex relative w-full h-full items-end">
                        <div className="relative w-full h-fit flex">
                            <Input/>
                            <Send className="absolute right-4 cursor-pointer top-2 w-6 h-6"/>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Chat;
