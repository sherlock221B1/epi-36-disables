import { Box, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import { getCompanyByTableId, getMenuCategoriesByTableId } from "./action";
import OrderAppHeader from "../../components/orderAppCompontents/OrderAppHeader";
import MenuCategoryTabs from "../../components/orderAppCompontents/MenuCategoryTabs";
import OrderAppBody from "../../components/orderAppCompontents/OrderAppBody";

interface Props {
  searchParams: {
    tableId: number;
  };
}
export default async function OrderPage({ searchParams }: Props) {
  const tableId = Number(searchParams.tableId);
  const company = await getCompanyByTableId(tableId);
  const menuCategories = await getMenuCategoriesByTableId(tableId);

  if (!company) return null;
  return (
    <Box>
      <OrderAppHeader company={company} />
      <OrderAppBody menuCategories={menuCategories} tableId={tableId} />
    </Box>
  );
}
