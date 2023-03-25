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
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('./db.service');
const fs = require('fs');
function getAllEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield db.event.findMany({
            orderBy: [{
                    date: 'desc',
                },
            ],
            select: {
                id: true,
                event_title: true,
                date: true,
                description: true,
            }
        });
        return events;
    });
}
function getEventById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventId = parseInt(id);
        const getResponse = {
            errorMessage: undefined,
            errorCode: undefined,
            data: undefined
        };
        try {
            const event = yield db.event.findUnique({
                where: {
                    id: eventId,
                },
            });
            if (event === null) {
                throw new Error("Event Not Found");
            }
            getResponse.data = event;
        }
        catch (e) {
            getResponse.errorMessage = "Event Not Found";
            getResponse.errorCode = 404;
            console.log("Event Not Found");
        }
        return getResponse;
    });
}
// Create DTO for new event
function createNewEvent(createObj) {
    return __awaiter(this, void 0, void 0, function* () {
        const createResponse = {
            errorMessage: undefined,
            errorCode: undefined,
            data: undefined
        };
        try {
            const newEvent = yield db.event.create({
                data: {
                    event_title: createObj.title,
                    date: new Date(createObj.date).toISOString(),
                    description: createObj.description,
                    audio_url: createObj.audio_url,
                    video_url: createObj.video_url,
                    handout_url: createObj.handout_url,
                }
            });
            console.log(typeof newEvent);
            createResponse.data = newEvent;
            return createResponse;
        }
        catch (e) {
            createResponse.errorCode = 400;
            if (e.code === 'P2002') {
                let errorMessage;
                if (e.meta['target'][0] === 'event_title') {
                    errorMessage = "Event Title Must Be Unique";
                }
                // createResponse.errorCode = e.code;
                createResponse.errorMessage = errorMessage;
            }
            else {
                createResponse.errorMessage = "Invalid Date";
            }
            return createResponse;
        }
    });
}
function deleteEvent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteId = parseInt(id);
        const deleteFiles = yield db.event.findUnique({
            where: {
                id: deleteId,
            },
            select: {
                audio_url: true,
                video_url: true,
                handout_url: true
            }
        });
        if (deleteFiles) {
            if (deleteFiles['audio_url']) {
                fs.unlink(`./assets/${deleteFiles['audio_url']}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            if (deleteFiles['video_url']) {
                fs.unlink(`./assets/${deleteFiles['video_url']}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            if (deleteFiles['handout_url']) {
                fs.unlink(`./assets/${deleteFiles['handout_url']}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
        const deleteEvent = yield db.event.delete({
            where: {
                id: deleteId,
            },
        });
        return deleteEvent;
    });
}
function updateEvent(updateObj) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateEvent = yield db.event.update({
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
        const replaceEvent = yield db.event.update({
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
        const eventExists = yield db.event.findUnique({
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
