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
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
router.use((req, res, next) => {
    console.log(`Request for: ${req.url}`);
    next();
});
// General endpoints
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield eventController.getAll());
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield eventController.createNewPost(req.body));
}));
// Event specific endpoints
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield eventController.getById(req.params.id));
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield eventController.updateById(req.params.id, req.body));
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield eventController.deleteById(req.params.id));
}));
module.exports = router;
