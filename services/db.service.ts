import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const event = prisma.event;
const user = prisma.user;

module.exports = {prisma, event, user};