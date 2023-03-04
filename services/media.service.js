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
exports.getVideoById = exports.getAudioById = exports.getMediaUrls = void 0;
const db = require("./db.service");
function getMediaUrls(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // .mp3, .mp4, .pdf
        let eventId = parseInt(id);
        let media = yield db.media.findUnique({
            where: {
                Event_id: eventId
            },
        });
        return media;
    });
}
exports.getMediaUrls = getMediaUrls;
function getAudioById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let eventId = parseInt(id);
        let audio = yield db.media.findUnique({
            where: {
                Event_id: eventId,
            },
            select: {
                audio_url: true,
            }
        });
        return audio;
    });
}
exports.getAudioById = getAudioById;
function getVideoById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let eventId = parseInt(id);
        let video = yield db.media.findUnique({
            where: {
                Event_id: eventId,
            },
            select: {
                video_url: true,
            }
        });
        return video;
    });
}
exports.getVideoById = getVideoById;
