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
function createNewEvent(body) {
    return __awaiter(this, void 0, void 0, function* () {
        let newEvent = yield db.event.create({
            data: {
                event_title: body.event_title,
                date: new Date(body.date).toISOString(),
                description: body.description
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
        console.log(deleteEvent);
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
            }
        });
    });
}
module.exports = { getAllEvents, getEventById, createNewEvent, deleteEvent, updateEvent };
