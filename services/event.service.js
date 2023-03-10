"use strict";
// Abstract database operations to db, only add what's neccessary for events in here
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require('./db.service');
const prisma = require('./db.service');
function getAllEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        let events = yield db.event.findMany({
            orderBy: [{
                    date: 'desc',
                },
            ],
            select: {
                id: true,
                event_title: true,
                date: true,
            }
        });
        return events;
    });
}
function getEventById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let eventId = parseInt(id);
        let event = yield db.event.findUnique({
            where: {
                id: eventId,
            },
        });
        return event;
    });
}
// Create DTO for new event
function createNewEvent(createObj) {
    return __awaiter(this, void 0, void 0, function* () {
        let newEvent = yield db.event.create({
            data: {
                event_title: createObj.title,
                date: new Date(createObj.date).toISOString(),
                description: createObj.description,
                audio_url: createObj.audio_url,
                video_url: createObj.video_url,
                handout_url: createObj.handout_url,
            }
        });
        return newEvent;
    });
}
function deleteEvent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let deleteId = parseInt(id);
        let deleteEvent = yield db.event.delete({
            where: {
                id: deleteId,
            },
        });
        return deleteEvent;
    });
}
function updateEvent(updateObj) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(updateObj);
        let updateEvent = yield db.event.update({
            where: { id: updateObj.id },
            data: {
                event_title: updateObj.title,
                date: updateObj.date ? new Date(updateObj.date).toISOString() : undefined,
                description: updateObj.description,
                audio_url: updateObj.audio_url,
                video_url: updateObj.video_url,
                handout_url: updateObj.handout_url
            }
        });
        return updateEvent;
    });
}
function replaceEvent(replaceOBJ) {
    return __awaiter(this, void 0, void 0, function* () {
        let replaceEvent = yield db.event.update({
            where: { id: replaceOBJ.id },
            data: {
                event_title: replaceOBJ.title,
                date: replaceOBJ.date ? new Date(replaceOBJ.date).toISOString() : undefined,
                description: replaceOBJ.description,
                audio_url: replaceOBJ.audio_url ? replaceOBJ.audio_url : null,
                video_url: replaceOBJ.video_url ? replaceOBJ.video_url : null,
                handout_url: replaceOBJ.handout_url ? replaceOBJ.handout_url : null,
            }
        });
        return replaceEvent;
    });
}
function checkIfTitleExists(title) {
    return __awaiter(this, void 0, void 0, function* () {
        let eventExists = yield db.event.findUnique({
            where: {
                event_title: title,
            },
        });
        if (eventExists) {
            return true;
        }
        return false;
    });
}
module.exports = { getAllEvents, getEventById, createNewEvent, deleteEvent, updateEvent, replaceEvent, checkIfTitleExists };
