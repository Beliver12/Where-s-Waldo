/*
  Warnings:

  - Changed the type of `startTime` on the `TrackTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currentTime` on the `TrackTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TrackTime" DROP COLUMN "startTime",
ADD COLUMN     "startTime" INTEGER NOT NULL,
DROP COLUMN "currentTime",
ADD COLUMN     "currentTime" INTEGER NOT NULL;
