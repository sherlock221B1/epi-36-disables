"use client";

import { Box } from "@mui/material";
import MenuCardOrderApp from "./MenuCardOrderApp";
import { Menus } from "@prisma/client";

interface Props {
  menus: Menus[];
  tableId: number;
}
export default function OrderMenusPage({ menus, tableId }: Props) {
  if (menus.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "warp",
          mt: 4,
          bgcolor: "#219ebc",
          color: "#f1faee",
          borderRadius: "7px",
          px: 3,
          py: 5,
        }}
      >
        <h1>There is no menus in this Menu Category</h1>
      </Box>
    );
  }
  return (
    <Box>
      {menus.map((menu) => {
        return <MenuCardOrderApp menu={menu} tableId={tableId} key={menu.id} />;
      })}
    </Box>
  );
}
