import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const event = prisma.event;

module.exports = {prisma, event};