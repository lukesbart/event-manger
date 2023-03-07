-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "audio_url" TEXT,
    "video_url" TEXT,
    "handout_url" TEXT
);
INSERT INTO "new_Event" ("audio_url", "date", "description", "event_title", "handout_url", "id", "video_url") SELECT "audio_url", "date", "description", "event_title", "handout_url", "id", "video_url" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_event_title_key" ON "Event"("event_title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
