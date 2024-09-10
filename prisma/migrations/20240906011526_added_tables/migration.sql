-- CreateTable
CREATE TABLE "Tables" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Tables_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tables" ADD CONSTRAINT "Tables_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
