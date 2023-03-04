import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const event1 = await prisma.event.upsert({
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
    const media1 = await prisma.media.upsert({
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

    const event2 = await prisma.event.upsert({
        where: { event_title: 'And there were two' },
        update: {},
        create: {
            event_title: 'And there were two',
            date: new Date("2023-01-02T08:30:00").toISOString(),
            description: "Second Event",
        },
    });
    const media2 = await prisma.media.upsert({
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

    const event3 = await prisma.event.upsert({
        where: { event_title: 'Another One' },
        update: {},
        create: {
            event_title: 'Third Event',
            date: new Date("2023-01-03T08:30:00").toISOString(),
            description: "Another one",
        },
    });
    const media3 = await prisma.media.upsert({
        where: {
            event_id: 3,
        },
        update: {},
        create: {
            audio_url: 'audio1-3.mp3',
            video_url: 'video1-3.mp4',
            transcript_url: 'transcript1-3.pdf',
        },
    })
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})