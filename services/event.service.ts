// Abstract database operations to db, only add what's neccessary for events in here

const db = require('./db.service');
const fs = require('fs');
import {ResponseOBJ} from '../interfaces/responseObj';

async function getAllEvents() {
    const events = await db.event.findMany({
        orderBy: [{
            date: 'desc',
            },
        ],
        select: {
            id: true,
            event_title: true,
            date: true,
            description: true,
        }
    });
    return events;
}

async function getEventById(id: string) {
    const eventId = parseInt(id);
    const getResponse: ResponseOBJ = {
        errorMessage: undefined,
        errorCode: undefined,
        data: undefined
    }

    try {
        const event = await db.event.findUnique({
            where: {
                id: eventId,
            },
        });

        if (event === null) {
            throw new Error("Event Not Found");
        }

        getResponse.data = event;

     
        } catch(e: any) {
            getResponse.errorMessage = "Event Not Found";
            getResponse.errorCode = 404;
            console.log("Event Not Found")
        }

    return getResponse;
}

// Create DTO for new event
async function createNewEvent(createObj: any) {
    const createResponse: ResponseOBJ = {
        errorMessage: undefined,
        errorCode: undefined,
        data: undefined
    }; 

    try {
        const newEvent = await db.event.create({
            data: {
                event_title: createObj.title,
                date: new Date(createObj.date).toISOString(),
                description: createObj.description,
                audio_url: createObj.audio_url,
                video_url: createObj.video_url,
                handout_url: createObj.handout_url,
            }
        })

        console.log(typeof newEvent)

        createResponse.data = newEvent;


        return createResponse; 
    } catch(e: any) {
        createResponse.errorCode = 400;
        if (e.code === 'P2002') {
            let errorMessage;

            if (e.meta['target'][0] === 'event_title') {
                errorMessage = "Event Title Must Be Unique"
            }

            // createResponse.errorCode = e.code;
            createResponse.errorMessage = errorMessage;

            
        } else {
            createResponse.errorMessage = "Invalid Date";
        }
        return createResponse;
    }
}

async function deleteEvent(id: string) {
    const deleteId = parseInt(id);

    const deleteFiles = await db.event.findUnique({
        where: {
            id: deleteId,
        },
        select: {
            audio_url: true,
            video_url: true,
            handout_url: true
        }
    })

    if (deleteFiles) {
        if (deleteFiles['audio_url']) {
            fs.unlink(`./assets/${deleteFiles['audio_url']}`, (err: Error) => {
                if (err) {
                    console.log(err);
                }
            })
        }
        
        if (deleteFiles['video_url']) {
            fs.unlink(`./assets/${deleteFiles['video_url']}`, (err: Error) => {
                if (err) {
                    console.log(err);
                }
            })
        }

        if (deleteFiles['handout_url']) {
            fs.unlink(`./assets/${deleteFiles['handout_url']}`, (err: Error) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    }

    const deleteEvent = await db.event.delete({
        where: {
            id: deleteId,
        },
    });

    return deleteEvent;
}

async function updateEvent(updateObj: any) {
    const updateEvent = await db.event.update({
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

    return updateEvent;
}

async function replaceEvent(replaceOBJ: any) {
    const replaceEvent = await db.event.update({
        where: {id: replaceOBJ.id},
        data: {
            event_title: replaceOBJ.title,
            date: replaceOBJ.date ? new Date(replaceOBJ.date).toISOString() : undefined,
            description: replaceOBJ.description,
            audio_url: replaceOBJ.audio_url ? replaceOBJ.audio_url : null,
            video_url: replaceOBJ.video_url ? replaceOBJ.video_url : null,
            handout_url: replaceOBJ.handout_url ? replaceOBJ.handout_url : null,
        }
    });

    return replaceEvent;
}

async function checkIfTitleExists(title: string) {
    const eventExists = await db.event.findUnique ({
        where: {
            event_title: title,
        },
    });

    if (eventExists) {
        return true
    }

    return false;
}

module.exports = {getAllEvents, getEventById, createNewEvent, deleteEvent, updateEvent, replaceEvent, checkIfTitleExists};