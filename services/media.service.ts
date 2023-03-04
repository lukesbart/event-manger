const db = require("./db.service");

async function getMediaUrls(id: string) {
    // .mp3, .mp4, .pdf
    let eventId = parseInt(id);

    let media = await db.media.findUnique({
        where: {
            Event_id: eventId
        },
    });

    return media;
}

async function getAudioById(id: string) {
    let eventId = parseInt(id);

    let audio = await db.media.findUnique({
        where: {
            Event_id: eventId,
        },
        select: {
            audio_url: true,
        }
    });

    return audio;
}

async function getVideoById(id: string) {
    let eventId = parseInt(id);

    let video = await db.media.findUnique({
        where: {
            Event_id: eventId,
        },
        select: {
            video_url: true,
        }
    });

    return video;
}

export {getMediaUrls, getAudioById, getVideoById};