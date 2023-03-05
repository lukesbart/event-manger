// Abstract database operations to db, only add what's neccessary for events in here

const db = require('./db.service');
const prisma = require('./db.service');

async function getAllEvents() {
    let events = await db.event.findMany({
        orderBy: [{
            date: 'desc',
            },
        ],
        select: {
            id: true,
            event_title: true,
            date: true,
        }
    });
    return events;
}

async function getEventById(id: string) {
    let eventId = parseInt(id);
    
    let event = await db.event.findUnique({
        where: {
            id: eventId,
        },
    });

    return event;
}

// Create DTO for new event
async function createNewEvent(createObj: any) {
    let newEvent = await db.event.create({
        data: {
            event_title: createObj.title,
            date: new Date(createObj.date).toISOString(),
            description: createObj.description,
            audio_url: createObj.audio_url,
            video_url: createObj.video_url,
            handout_url: createObj.handout_url,
        }
    })
    return newEvent;
}

async function deleteEvent(id: string) {
    let deleteId = parseInt(id);

    let deleteEvent = await db.event.delete({
        where: {
            id: deleteId,
        },
    });

    console.log(deleteEvent);
}

async function updateEvent(updateObj: any) {
    console.log(updateObj);

    let updateEvent = await db.event.update({
        where: {id: updateObj.id},
        data: {
            event_title: updateObj.title,
            date: updateObj.date ? new Date(updateObj.date).toISOString(): undefined,
            description: updateObj.description,
            audio_url: updateObj.audio_url,
            video_url: updateObj.video_url,
            handout_url: updateObj.handout_url
        }
    });
}

module.exports = {getAllEvents, getEventById, createNewEvent, deleteEvent, updateEvent};