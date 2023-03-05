-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "handout_url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_title_key" ON "Event"("event_title");