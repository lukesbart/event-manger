-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Media" (
    "event_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "audio_url" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "transcript_url" TEXT NOT NULL,
    CONSTRAINT "Media_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_title_key" ON "Event"("event_title");

