const db = require('./db.service');

async function validateUser(username: string, password: string) {
    const user = await db.user.findUnique({
        where: {
            username: username
        },
        select: {
            password: true,
        }
    });

    if (user == null) {
        return false;
    } else if (user.password == password){
        return true;
    } else {
        return false;
    }
}

export {validateUser};