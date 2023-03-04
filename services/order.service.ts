const db = require("./db.service")

class EventOrder {

    public static instance: EventOrder;

    // use array[id, id, id]
    // array[id].next
    // array[id].prev

    public static EventOrder: Array<number> = [];

    private constructor() {
        // this.
    }

    public static getInstance(): EventOrder {
        if(!EventOrder.instance) {
            EventOrder.instance = new EventOrder();
            this.setOrder();
        }

        return EventOrder.instance;
    }

    // Only called when server is started and when user changes order
    public static async setOrder() {
        // Gives dates and ids as object
        let dates_and_ids = await db.event.findMany({
            select: {
                id: true,
                date: true,
            },
        });

        //sortDates(dates_and_ids)
        //strip dates from object and return to EventOrder
    }

    private static sortDates(dateObj: any) {
        // User Merge Sort
    }
    
}

let EventOrderObj = EventOrder.getInstance();
let EventOrderObj1 = EventOrder.getInstance();

console.log(EventOrderObj === EventOrderObj1);

export {}