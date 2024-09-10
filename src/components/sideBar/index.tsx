import LocalMallIcon from "@mui/icons-material/LocalMall";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import TableBarIcon from "@mui/icons-material/TableBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import Link from "next/link";
import { it } from "node:test";

interface sideBarItem {
  id: number;
  label: string;
  icon: JSX.Element;
  route: string;
}
const sideBarItems: sideBarItem[] = [
  {
    id: 1,
    label: "Orders",
    icon: <LocalMallIcon />,
    route: "/backoffice",
  },
  {
    id: 2,
    label: "Menus Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menu-categories",
  },
  {
    id: 3,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 4,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addon-categories",
  },
  {
    id: 5,
    label: "Addons",
    icon: <EggIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 6,
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/backoffice/tables",
  },
  {
    id: 7,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 8,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];
export default function SideBar() {
  const sidebarStyle: SxProps = {
    bgcolor: "#023047",
    color: "#8ecae6",
    width: "15vw",
    height: "100vh",
    padding: "0",
  };
  return (
    <Box sx={sidebarStyle}>
      <List sx={{ padding: "0" }}>
        {sideBarItems.map((item) => {
          return (
            <Link key={item.id} href={item.route}>
              <ListItem
                sx={{
                  padding: "0",
                  ":hover": { bgcolor: "#8ecae6", color: "#023047" },
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText> {item.label}</ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );
}
