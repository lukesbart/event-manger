# Event Manager

An event manager webapp with Express and Prisma\
Fields with ? are optional

## Route tree:
/event
* GET: get all events
* POST: create new event
    * fields (enctype="multipart/form-data"):
        * title: string
        * date: string
        * description: string
        * mp3?: audio/mpeg
        * mp4?: video/mp4
        * pdf?: application/pdf

/event/:id
* GET: get post with id
* PUT: update post with id
    * fields (enctype="multipart/form-data"):
        * title?: string
        * date?: string
        * description?: string
        * mp3?: audio/mpeg
        * mp4?: video/mp4
        * pdf?: application/pdf

* DELETE: delete post with id

## Stack
**Typescript** for the language\
**Express.js** for the server\
**Prisma** for the ORM based off of **SQLite** Database\
**Multer** for multipart/form-data (file upload) submissions\
**Morgan** for server logging\
**Helmet** for server security
