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
exports.validateUser = void 0;
const db = require('./db.service');
function validateUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield db.user.findUnique({
            where: {
                username: username
            },
            select: {
                password: true,
            }
        });
        if (user == null) {
            return false;
        }
        else if (user.password == password) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.validateUser = validateUser;
