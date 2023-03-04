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
const db = require("./db.service");
class EventOrder {
    constructor() {
        // this.
    }
    static getInstance() {
        if (!EventOrder.instance) {
            EventOrder.instance = new EventOrder();
            this.setOrder();
        }
        return EventOrder.instance;
    }
    // Only called when server is started and when user changes order
    static setOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            // Gives dates and ids as object
            let dates_and_ids = yield db.event.findMany({
                select: {
                    id: true,
                    date: true,
                },
            });
            //sortDates(dates_and_ids)
            //strip dates from object and return to EventOrder
        });
    }
    static sortDates(dateObj) {
        // User Merge Sort
    }
}
// use array[id, id, id]
// array[id].next
// array[id].prev
EventOrder.EventOrder = [];
let EventOrderObj = EventOrder.getInstance();
let EventOrderObj1 = EventOrder.getInstance();
console.log(EventOrderObj === EventOrderObj1);
