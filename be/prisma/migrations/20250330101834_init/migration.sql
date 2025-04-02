/*
  Warnings:

  - You are about to drop the column `imageCord` on the `Cordinates` table. All the data in the column will be lost.
  - You are about to drop the `TrackTime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cordBotY` to the `Cordinates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cordLeftX` to the `Cordinates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cordRightX` to the `Cordinates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cordTopY` to the `Cordinates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Cordinates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Cordinates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `LeaderBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cordinates" DROP COLUMN "imageCord",
ADD COLUMN     "cordBotY" INTEGER NOT NULL,
ADD COLUMN     "cordLeftX" INTEGER NOT NULL,
ADD COLUMN     "cordRightX" INTEGER NOT NULL,
ADD COLUMN     "cordTopY" INTEGER NOT NULL,
ADD COLUMN     "imageId" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LeaderBoard" ADD COLUMN     "imageId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TrackTime";

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaderBoard" ADD CONSTRAINT "LeaderBoard_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cordinates" ADD CONSTRAINT "Cordinates_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
