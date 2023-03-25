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
const eventService = require("../services/event.service");
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return eventService.getAllEvents();
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield eventService.getEventById(id);
        if (event == null) {
            const errorObj = { code: 404 };
            return errorObj;
        }
        return event;
    });
}
function createNewPost(createObj) {
    return __awaiter(this, void 0, void 0, function* () {
        const newEvent = yield eventService.createNewEvent(createObj);
        return newEvent;
    });
}
function updateById(updateOBJ) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedEvent = eventService.updateEvent(updateOBJ);
        return updatedEvent;
    });
}
function replaceByID(replaceOBJ) {
    return __awaiter(this, void 0, void 0, function* () {
        const replaceEvent = eventService.replaceEvent(replaceOBJ);
        return replaceEvent;
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteEvent = yield eventService.deleteEvent(id);
        return deleteEvent;
    });
}
module.exports = { getAll, getById, updateById, createNewPost, replaceByID, deleteById };
