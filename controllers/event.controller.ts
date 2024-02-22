const eventService = require("../services/event.service");
import { error } from "../interfaces/error"
import { CreateDTO } from "../interfaces/createDTO"
import { UpdateDTO } from "../interfaces/updateDTO"

async function getAll() {
    return eventService.getAllEvents();
}

async function getById(id: string) {
    const event = await eventService.getEventById(id);

    if (event == null) {
        const errorObj: error = {code: 404};
        return errorObj;
    }

    return event;
}

async function createNewPost(createObj: CreateDTO) {
    const newEvent = await eventService.createNewEvent(createObj);
    return newEvent;
}

async function updateById(updateOBJ: UpdateDTO) {
    const updatedEvent = eventService.updateEvent(updateOBJ);
    return updatedEvent;
}

async function replaceByID(replaceOBJ: UpdateDTO) {
    const replaceEvent = eventService.replaceEvent(replaceOBJ);
    return replaceEvent;
}

async function deleteById(id: string) {
    const deleteEvent = await eventService.deleteEvent(id);
    return deleteEvent;
}


module.exports = {getAll, getById, updateById, createNewPost, replaceByID, deleteById};
