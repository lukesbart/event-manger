"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const event1 = yield prisma.event.upsert({
            where: {
                event_title: 'It begins!',
            },
            update: {},
            create: {
                event_title: 'It begins!',
                date: new Date("2023-01-01T08:30:00").toISOString(),
                description: "First Event",
            },
        });
        const media1 = yield prisma.media.upsert({
            where: {
                event_id: 1,
            },
            update: {},
            create: {
                audio_url: 'audio1-1.mp3',
                video_url: 'video1-1.mp4',
                transcript_url: 'transcript1-1.pdf',
            },
        });
        const event2 = yield prisma.event.upsert({
            where: { event_title: 'And there were two' },
            update: {},
            create: {
                event_title: 'And there were two',
                date: new Date("2023-01-02T08:30:00").toISOString(),
                description: "Second Event",
            },
        });
        const media2 = yield prisma.media.upsert({
            where: {
                event_id: 2,
            },
            update: {},
            create: {
                audio_url: 'audio1-2.mp3',
                video_url: 'video1-2.mp4',
                transcript_url: 'transcript1-2.pdf',
            }
        });
        const event3 = yield prisma.event.upsert({
            where: { event_title: 'Another One' },
            update: {},
            create: {
                event_title: 'Third Event',
                date: new Date("2023-01-03T08:30:00").toISOString(),
                description: "Another one",
            },
        });
        const media3 = yield prisma.media.upsert({
            where: {
                event_id: 3,
            },
            update: {},
            create: {
                audio_url: 'audio1-3.mp3',
                video_url: 'video1-3.mp4',
                transcript_url: 'transcript1-3.pdf',
            },
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
