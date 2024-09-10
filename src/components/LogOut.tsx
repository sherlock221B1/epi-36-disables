"use client";

import { getLocationsByCompanyId, getTablesByLocationId } from "@/libs/action";
import { Locations, Tables } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LogOut() {
  return (
    <>
      <h3 style={{ cursor: "pointer" }} onClick={() => signOut()}>
        Log Out
      </h3>
    </>
  );
}
