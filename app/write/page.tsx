"use client";

import Write_Form from "./Write_Form";
import { SessionProvider } from "next-auth/react";

export default function Write() {
  return (
    <SessionProvider>
      <Write_Form />
    </SessionProvider>
  );
}
