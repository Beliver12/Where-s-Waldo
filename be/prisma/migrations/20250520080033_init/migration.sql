/*
  Warnings:

  - Added the required column `imageId` to the `LeaderBoardCordinates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaderBoardCordinates" ADD COLUMN     "imageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LeaderBoardCordinates" ADD CONSTRAINT "LeaderBoardCordinates_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
