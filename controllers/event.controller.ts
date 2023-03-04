const eventService = require("../services/event.service");
const mediaService = require("../services/media.service");

async function getAll() {
    return eventService.getAllEvents();
}

async function getById(id: string) {
    let event = await eventService.getEventById(id);
    let media = await mediaService.getMediaUrls(id);

    if (event == null) {
        return JSON.parse(`[{"error": 404}]`)
    }

    event.media = media;

    return event;
}

async function createNewPost(body: any) {
    if ("event_title" in body && "date" in body && "description" in body) {
        await eventService.createNewEvent(body);
        return "Event Created";
    } else {
        return "Bad request";
    }
}

async function updateById(id: string, body: any) {
    interface UpdateDTO {
        id: number,
        title: string;
        description: string;
        date: string;
    }

    let updateObj: UpdateDTO = {
        id: parseInt(id),
        title: body.event_title ? body.event_title : undefined,
        description: body.description ? body.description : undefined,
        date: body.date ? body.date : undefined,
    };

    eventService.updateEvent(updateObj);

    console.log(body);

    return "Success";
}

async function deleteById(id: string) {
    let deleteEvent = await eventService.deleteEvent(id);
    console.log(`Delete: ${id}`)
    console.log(deleteEvent);

    return `Delete: ${id}`;
}

async function getAudioById(id: string) {
    let audio = await mediaService.getAudioById(id);

    if (audio == null) {
        return JSON.parse(`[{"error": 404}]`);
    }

    return audio;
}

async function getVideoById(id: string) {
    let video = await mediaService.getVideoById(id);

    if (video == null) {
        return JSON.parse(`[{"error" 404}]`);
    }

    return video;
}

module.exports = {getAll, getById, getAudioById, updateById, getVideoById, createNewPost, deleteById};