"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";


export function Header() {
  const session = useSession();

  return (
    <header>
      <div>
        {session.data ? (
        <Button onClick={() => signOut()}>SignOut</Button>
        ) : (
        <Button onClick={() => signIn()}>SignIn</Button>
        )}

        {session.data?.user?.name}
        <ModeToggle />
      </div>
    </header>
  );
}