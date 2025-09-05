"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

import { ChartPie, HandCoins, LogOut, MenuIcon, Tag } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "@/app/(auth)/signout/actions";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: <ChartPie />, isActive: true },
  {
    name: "Patrimonio",
    href: "/patrimony",
    icon: <HandCoins />,
    isActive: false,
  },
  {
    name: "Categorias",
    href: "/categories",
    icon: <Tag />,
    isActive: false,
  },
];

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-md ">
      <div className="flex items-center justify-between container mx-auto py-3 px-4">
        <Image src="/zenna.svg" alt="Logo" width={80} height={80} />

        <div className="flex items-center gap-8">
          {/* Menu Desktop */}
          <nav className="">
            <ul className="items-center gap-4 hidden md:flex">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Button
                    className="flex items-center gap-2 "
                    variant={pathname === item.href ? "default" : "ghost"}
                    asChild
                  >
                    <Link href={item.href}>
                      {item.icon && React.cloneElement(item.icon, { size: 16 })}
                      {item.name}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>

            {/* Menu Mobile */}
            <div className="flex md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="p-2" variant="outline">
                    <MenuIcon size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {navigation.map((item) => (
                    <div key={item.name} className="space-y-2 p-2">
                      <Button
                        className="flex items-center gap-2 "
                        variant={pathname === item.href ? "default" : "ghost"}
                        asChild
                      >
                        <Link href={item.href}>
                          {item.icon &&
                            React.cloneElement(item.icon, { size: 16 })}
                          {item.name}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/antdavi.png"
                  alt="@antdavi"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={() => signOut()}
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
