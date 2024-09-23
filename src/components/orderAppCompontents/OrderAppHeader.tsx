import { Box } from "@mui/material";
import { Company } from "@prisma/client";
import Image from "next/image";

interface Props {
  company: Company;
}
export default function OrderAppHeader({ company }: Props) {
  return (
    <Box>
      <Image
        src="/order-app-header.svg"
        width={0}
        height={0}
        alt="order-app-header"
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: "30px",
          color: "#f1faee",
        }}
      >
        <h1>{company?.name}</h1>
        <h4 style={{ fontStyle: "italic" }}>{company.name}</h4>
      </Box>
    </Box>
  );
}
