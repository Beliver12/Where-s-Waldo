/*
  Warnings:

  - You are about to drop the column `leaderBoardId` on the `Cordinates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cordinates" DROP CONSTRAINT "Cordinates_leaderBoardId_fkey";

-- AlterTable
ALTER TABLE "Cordinates" DROP COLUMN "leaderBoardId";
