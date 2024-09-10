/*
  Warnings:

  - You are about to drop the `SelectedLocationByUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SelectedLocationByUser" DROP CONSTRAINT "SelectedLocationByUser_locationId_fkey";

-- DropForeignKey
ALTER TABLE "SelectedLocationByUser" DROP CONSTRAINT "SelectedLocationByUser_userId_fkey";

-- DropTable
DROP TABLE "SelectedLocationByUser";

-- CreateTable
CREATE TABLE "UserAndSelectedLocation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "UserAndSelectedLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAndSelectedLocation" ADD CONSTRAINT "UserAndSelectedLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAndSelectedLocation" ADD CONSTRAINT "UserAndSelectedLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
