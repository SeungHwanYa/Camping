"use client";

import { SessionProvider } from "next-auth/react";
import Header_Wrap from "../components/Header_Wrap";

export default function Header() {

  return (
    <SessionProvider>
      <Header_Wrap />
    </SessionProvider>
  );
}
