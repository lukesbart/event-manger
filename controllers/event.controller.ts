const eventService = require("../services/event.service");
import { error } from "../interfaces/error"
import { CreateDTO } from "../interfaces/createDTO"
import { UpdateDTO } from "../interfaces/updateDTO"

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

async function createNewPost(createObj: CreateDTO) {
    await eventService.createNewEvent(createObj);
    return "Event created";
}

async function updateById(updateOBJ: UpdateDTO) {
    eventService.updateEvent(updateOBJ);
    return "Success";
}

async function deleteById(id: string) {
    let deleteEvent = await eventService.deleteEvent(id);
    console.log(`Delete: ${id}`)
    console.log(deleteEvent);

    return `Delete: ${id}`;
}


module.exports = {getAll, getById, updateById, createNewPost, deleteById};