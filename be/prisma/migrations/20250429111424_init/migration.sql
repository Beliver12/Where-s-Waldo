-- DropForeignKey
ALTER TABLE "Cordinates" DROP CONSTRAINT "Cordinates_leaderBoardId_fkey";

-- AlterTable
ALTER TABLE "Cordinates" ALTER COLUMN "leaderBoardId" DROP NOT NULL,
ALTER COLUMN "leaderBoardId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Cordinates" ADD CONSTRAINT "Cordinates_leaderBoardId_fkey" FOREIGN KEY ("leaderBoardId") REFERENCES "LeaderBoard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
