-- AlterTable
ALTER TABLE "Cordinates" ADD COLUMN     "leaderBoardId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Cordinates" ADD CONSTRAINT "Cordinates_leaderBoardId_fkey" FOREIGN KEY ("leaderBoardId") REFERENCES "LeaderBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
