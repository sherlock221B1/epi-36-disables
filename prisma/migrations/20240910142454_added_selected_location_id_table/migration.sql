-- CreateTable
CREATE TABLE "SelectedLocationByUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "SelectedLocationByUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SelectedLocationByUser" ADD CONSTRAINT "SelectedLocationByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedLocationByUser" ADD CONSTRAINT "SelectedLocationByUser_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
