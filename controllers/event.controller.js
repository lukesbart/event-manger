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
        let event = yield eventService.getEventById(id);
        if (event == null) {
            let errorObj = { code: 404 };
            return errorObj;
        }
        return event;
    });
}
function createNewPost(createObj) {
    return __awaiter(this, void 0, void 0, function* () {
        yield eventService.createNewEvent(createObj);
        return "Event created";
    });
}
function updateById(updateOBJ) {
    return __awaiter(this, void 0, void 0, function* () {
        eventService.updateEvent(updateOBJ);
        return "Success";
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let deleteEvent = yield eventService.deleteEvent(id);
        console.log(`Delete: ${id}`);
        console.log(deleteEvent);
        return `Delete: ${id}`;
    });
}
module.exports = { getAll, getById, updateById, createNewPost, deleteById };
