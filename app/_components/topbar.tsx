/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { SignedIn, useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { NavigationButton } from "./navigationButton";
import { usePathname, useRouter } from "next/navigation";
import { LogOutIcon, SettingsIcon, UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { signOut, openUserProfile } = useClerk();

  const { user, isLoaded, isSignedIn } = useUser();
  if (!isLoaded) {
    return (
      <div className="flex h-auto w-full flex-row items-start justify-start border-b border-white border-opacity-[0.08] px-8 py-4">
        <div className="flex h-auto w-full flex-row items-center justify-between">
          <div className="flex h-auto w-auto flex-row gap-12">
            <Image src="/logo.svg" alt="finance.ai" width={173} height={39} />

            <NavigationButton>Dashboard</NavigationButton>
            <NavigationButton>Transações</NavigationButton>
            <NavigationButton>Assinatura</NavigationButton>
          </div>

          <div className="flex min-h-2 flex-row rounded-[8px] border border-white border-opacity-[0.08] px-4 py-2">
            <UserCircle size={5} /> ???
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    if (pathname !== "/login") {
      router.push("/login");
    }

    return;
  }

  if (pathname === "/login") {
    router.push("/");

    return;
  }

  const img = user.imageUrl;

  const fullName = user?.fullName || "";
  let name = `${user?.firstName} ${user?.lastName}`;
  if (name !== fullName && fullName !== "") {
    let all = fullName.split(" ");
    all = all.filter(
      (word) =>
        word !== user?.firstName &&
        word !== user?.lastName &&
        word.charAt(0) === word.charAt(0).toUpperCase(),
    );
    all = all.map((word) => ` ${word.charAt(0).toUpperCase()}.`);

    name = `${user?.firstName}${all.join()} ${user?.lastName}`;
  }

  function clicked(path: string) {
    if (path === pathname) {
      return;
    }

    router.push(path);
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOpenUserProfile = () => {
    openUserProfile();
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <SignedIn>
      <DropdownMenu>
        <DropdownMenuContent className="w-full rounded-[8px] border border-white border-opacity-[0.08] bg-black">
          <DropdownMenuItem
            onClick={handleOpenUserProfile}
            className="bg-transparent text-white focus:bg-zinc-200 focus:text-zinc-800"
          >
            <SettingsIcon />
            Manage Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="bg-transparent text-white focus:bg-red-600 focus:text-zinc-200"
          >
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>

        <div className="flex h-auto w-full flex-col items-end justify-between">
          <div className="flex h-auto w-full flex-row items-start justify-start border-b border-white border-opacity-[0.08] px-8 py-4">
            <div className="flex h-auto w-full flex-row items-center justify-between">
              <div className="flex h-auto w-auto flex-row gap-12">
                <Image
                  src="/logo.svg"
                  alt="finance.ai"
                  width={173}
                  height={39}
                />

                <NavigationButton
                  onClick={() => clicked("/")}
                  variant={pathname === "/" ? "selected" : "default"}
                >
                  Dashboard
                </NavigationButton>
                <NavigationButton
                  onClick={() => clicked("/transactions")}
                  variant={
                    pathname === "/transactions" ? "selected" : "default"
                  }
                >
                  Transações
                </NavigationButton>
                <NavigationButton
                  onClick={() => clicked("/subscription")}
                  variant={
                    pathname === "/subscription" ? "selected" : "default"
                  }
                >
                  Assinatura
                </NavigationButton>
              </div>

              <div>
                <DropdownMenuTrigger asChild>
                  <Button
                    onClick={toggleDropdown}
                    className="flex min-h-2 flex-row rounded-[8px] border border-white border-opacity-[0.08] bg-transparent px-4 py-2 ring-transparent hover:border-opacity-15 hover:bg-white hover:bg-opacity-5 focus-visible:border-dashed focus-visible:border-green-400 focus-visible:border-opacity-50 focus-visible:ring-transparent"
                  >
                    <Image
                      className="rounded-[9999px]"
                      src={img}
                      alt={UserCircle.toString()}
                      width={20}
                      height={20}
                    />

                    <span className="text-sm font-semibold leading-[17.57px]">
                      {name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenu>
    </SignedIn>
  );
}
