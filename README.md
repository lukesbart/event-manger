# Event Manager

An event manager webapp with Express and Prisma\
All POST fields are required\
All PUT fields are optional

Route tree:\
\
/event
* GET: get all events
* POST: create new event
    * fields (enctype="multipart/form-data"):
        * title: string
        * date: string
        * description: string
        * mp3: audio/mpeg
        * mp4: video/mp4
        * handout: application/pdf

/event/:id
* GET: get post with id
* PUT: update post with id
    * fields (enctype="multipart/form-data"):
        * title?: string
        * date?: string
        * description?: string
        * mp3?: audio/mpeg
        * mp4?: video/mp4
        * handout?: application/pdf

DELETE: delete post with id