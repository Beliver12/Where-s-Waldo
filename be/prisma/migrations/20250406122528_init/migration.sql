/*
  Warnings:

  - You are about to drop the column `inGame` on the `Cordinates` table. All the data in the column will be lost.
  - Added the required column `found` to the `Cordinates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cordinates" DROP COLUMN "inGame",
ADD COLUMN     "found" TEXT NOT NULL;
