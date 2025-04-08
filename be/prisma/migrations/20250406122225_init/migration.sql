/*
  Warnings:

  - Added the required column `inGame` to the `Cordinates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cordinates" ADD COLUMN     "inGame" TEXT NOT NULL;
