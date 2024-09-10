import SideBar from "@/components/sideBar";
import TopBar from "@/components/topBar";
import { Box, Button } from "@mui/material";
import next from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menus, Tables } from "@prisma/client";
import config from "@/config";
import { useRouter } from "next/navigation";
import MenuCard from "@/components/MenuCard";
import { prisma } from "@/libs/prisma";
import { getTablesByLocationId } from "@/libs/action";

export default async function MenusPage() {
  const menus: Menus[] = await prisma.menus.findMany();
  const tables: Tables[] = await getTablesByLocationId(3);

  if (!menus) {
    return (
      <Box>
        <h1>hello</h1>
      </Box>
    );
  }

  if (menus.length === 0) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px",
            paddingTop: "0px",
          }}
        >
          <Link href={"/backoffice/menus/addingMenus"}>
            <Button
              sx={{
                bgcolor: "#023047",
                color: "#8ecae6",
                ":hover": { bgcolor: "#8ecae6", color: "#023047" },
              }}
              variant="contained"
            >
              Create New
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            mt: "20px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              backgroundColor: "#8ecae6",
              color: "#023047",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            There is no menu yet
          </h1>
        </Box>
      </>
    );
  }

  return (
    <>
      {tables.map((table) => {
        return <h1>{table.name}</h1>;
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
          paddingTop: "0px",
        }}
      >
        <Link href={"/backoffice/menus/addingMenus"}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            }}
          >
            Create New
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          mt: "20px",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {menus.map((menu) => {
          return <MenuCard key={menu.id} menu={menu} />;
        })}
      </Box>
    </>
  );
}
