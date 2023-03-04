"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const event = prisma.event;
const media = prisma.media;
module.exports = { prisma, event, media };
