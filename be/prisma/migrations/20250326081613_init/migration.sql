-- CreateTable
CREATE TABLE "TrackTime" (
    "id" SERIAL NOT NULL,
    "startTime" TEXT NOT NULL,
    "currentTime" TEXT NOT NULL,

    CONSTRAINT "TrackTime_pkey" PRIMARY KEY ("id")
);
