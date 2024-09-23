"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { Menus, MenusCategories } from "@prisma/client";
import { useEffect, useState } from "react";
import MenuCardOrderApp from "./MenuCardOrderApp";
import { getMenusByMenuCategoryId } from "../../app/order/action";
import MenuCategoryTabs from "./MenuCategoryTabs";
import MenusPage from "./OrderMenusPage";
import OrderMenusPage from "./OrderMenusPage";

interface Props {
  menuCategories: MenusCategories[];
  tableId: number;
}
export default function OrderAppBody({ menuCategories, tableId }: Props) {
  const [menus, setMenus] = useState<Menus[]>([]);
  const [selectedMenuCategoryId, setSelectedMenuCategoryId] = useState<number>(
    menuCategories[0].id
  );

  useEffect(() => {
    handleGetMenus();
  }, [selectedMenuCategoryId]);

  const handleGetMenus = async () => {
    if (!selectedMenuCategoryId) return null;
    const menus = await getMenusByMenuCategoryId(
      selectedMenuCategoryId,
      tableId
    );
    setMenus(menus);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        top: -70,
      }}
    >
      <MenuCategoryTabs
        menuCategories={menuCategories}
        selectedMenuCategoryId={selectedMenuCategoryId}
        setSelectedMenuCategoryId={setSelectedMenuCategoryId}
      />
      <OrderMenusPage menus={menus} tableId={tableId} />
    </Box>
  );
}
