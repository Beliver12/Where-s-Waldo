-- CreateTable
CREATE TABLE "LeaderBoardCordinates" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "cordTopY" TEXT NOT NULL,
    "cordBotY" TEXT NOT NULL,
    "cordLeftX" TEXT NOT NULL,
    "cordRightX" TEXT NOT NULL,
    "found" TEXT NOT NULL DEFAULT 'false',
    "leaderBoardId" INTEGER NOT NULL,

    CONSTRAINT "LeaderBoardCordinates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaderBoardCordinates" ADD CONSTRAINT "LeaderBoardCordinates_leaderBoardId_fkey" FOREIGN KEY ("leaderBoardId") REFERENCES "LeaderBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
