"use client";

import { cn } from "@/lib/utils";
import { BellDot, Bookmark, Folder, FolderDot, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import UserButton from "./auth/UserButton";

const items = [
  { label: "Favorit", link: "/favorite", icon: <Bookmark />, role: 'user' },
  { label: "Notifications", link: "#", icon: <BellDot />, role: 'user' },
  { label: "Keranjang", link: "/cart", icon: <ShoppingCart />, role: 'user' },
  { label: "Dashboard", link: "/dashboard", icon: <FolderDot />, role: 'admin' },
];

export default function Navbar({ user }: { user: any }) {
  return (
    <>
      <DesktopNavbar user={user} />
      <MobileNavbar user={user} />
    </>
  );
}

function MobileNavbar({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = user?.role === 'admin';
  const filteredItems = items.filter(item => item.role === 'user' || (isAdmin && item.role === 'admin'));

  return (

    <div
      className="absolute z-40 h-fit w-full"
      style={{
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
      }}
    >
      <div className="block md:hidden" >
        <nav className="container flex items-center justify-between px-8">
          <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
              >
                <Menu className="w-8 h-8 shrink-0" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-[400px] sm:w-[540px]"
              side={"left"}
            >
              <Logo />
              <div className="flex flex-col gap-1 pt-4">
                {filteredItems.map((item) => (
                  <NavbarItem
                    key={item.label}
                    link={item.link}
                    label={item.label}
                    icon={item.icon}
                    role={item.role}
                    clickCallback={() => setIsOpen(false)}
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

function DesktopNavbar({ user }: { user: any }) {
  const isAdmin = user?.role === 'admin';
  const filteredItems = items.filter(item => item.role === 'user' || (isAdmin && item.role === 'admin'));

  return (
    <div
      className="absolute z-40 h-fit w-full"
      style={{
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
      }}
    >
      <div className="hidden md:block" >
        <nav className="container flex items-center justify-between gap-x-4">
          <Logo />
          <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
            <div className="flex h-full gap-x-2">
              {filteredItems.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={''}
                  icon={item.icon}
                  role={item.role}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavbarItem({
  link,
  label,
  clickCallback,
  icon
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
  icon: any
  role: any
}) {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full gap-2 justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallback) {
            clickCallback();
          }
        }}
      >
        {icon}
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl dark:bg-primary bg-emerald-500 md:block" />
      )}
    </div>
  );
}
