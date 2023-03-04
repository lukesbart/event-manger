const eventService = require("../services/event.service");
import { error } from "../interfaces/error"

async function getAll() {
    return eventService.getAllEvents();
}

async function getById(id: string) {
    let event = await eventService.getEventById(id);

    if (event == null) {
        let errorObj: error = {code: 404};
        return errorObj;
    }

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


module.exports = {getAll, getById, updateById, createNewPost, deleteById};