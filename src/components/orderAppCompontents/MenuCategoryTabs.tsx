"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Menus, MenusCategories } from "@prisma/client";
import { useEffect, useState } from "react";
import MenuCardOrderApp from "./MenuCardOrderApp";
import { getMenusByMenuCategoryId } from "../../app/order/action";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Props {
  menuCategories: MenusCategories[];
  selectedMenuCategoryId: number;
  setSelectedMenuCategoryId: React.Dispatch<React.SetStateAction<number>>;
}
export default function MenuCategoryTabs({
  menuCategories,
  selectedMenuCategoryId,
  setSelectedMenuCategoryId,
}: Props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    /*     <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        top: -70,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: { backgroundColor: "#219ebc" },
          }}
          sx={{
            "& .MuiTab-root.Mui-selected": {
              color: "#219ebc",
              fontWeight: "bole",
            },
          }}
          variant="scrollable"
        >
          {menuCategories.map((menuCategory) => {
            return (
              <Tab
                label={menuCategory.name}
                key={menuCategory.id}
                onClick={() => {
                  setSelectedMenuCategoryId(menuCategory.id);
                  console.log(selectedMenuCategoryId);
                }}
              />
            );
          })}
        </Tabs>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "warp",
          mt: 4,
        }}
      >
        {menus.map((menu) => {
          return (
            <MenuCardOrderApp menu={menu} tableId={tableId} key={menu.id} />
          );
        })}
      </Box>
    </Box>
 */
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        TabIndicatorProps={{
          style: { backgroundColor: "#219ebc" },
        }}
        sx={{
          "& .MuiTab-root.Mui-selected": {
            color: "#219ebc",
            fontWeight: "bole",
          },
        }}
        variant="scrollable"
      >
        {menuCategories.map((menuCategory) => {
          return (
            <Tab
              label={menuCategory.name}
              key={menuCategory.id}
              onClick={() => {
                setSelectedMenuCategoryId(menuCategory.id);
                console.log(selectedMenuCategoryId);
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
