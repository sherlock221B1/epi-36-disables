"use client";

import { Box, Button } from "@mui/material";
import Image from "next/image";

interface Props {
  qrCodeImageUrl: string;
}
export default function QrCodeImage({ qrCodeImageUrl }: Props) {
  const handlePrintQrImage = () => {
    const imageWindow = window.open("");
    imageWindow?.document.write(`
<!DOCTYPE html>
    <html lang="en">
        <head>
         <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Print Image</title>
        </head>
    <body>
        <img src="${qrCodeImageUrl}" onload="window.print();window.close()"/>
    </body>
</html>`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Image src={qrCodeImageUrl} alt="qr-image-url" width={150} height={150} />
      <Button variant="contained" onClick={handlePrintQrImage} sx={{ my: 2 }}>
        Print
      </Button>
    </Box>
  );
}
