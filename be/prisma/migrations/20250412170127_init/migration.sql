/*
  Warnings:

  - Added the required column `finishedGame` to the `LeaderBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaderBoard" ADD COLUMN     "finishedGame" TEXT NOT NULL;
