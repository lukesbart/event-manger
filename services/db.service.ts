import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const event = prisma.event;
const media = prisma.media;

module.exports = {prisma, event, media};