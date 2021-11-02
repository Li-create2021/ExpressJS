const express = require('express');
const servPort = process.env.PORT || 8000;
const app = express();

const things = [
    { id: 1, name: "socks" },
    { id: 2, name: "shoes" },
    { id: 3, name: "laptop" },
    { id: 4, name: "mouse" },
    { id: 5, name: "usb drive" },
    { id: 6, name: "coffee" },
    { id: 7, name: "keyboard" },
    { id: 8, name: "mobile" },
    { id: 9, name: "ipad" },
    { id: 10, name: "lamp" },
]

app.get('/', (req, res) => {
    console.log('Message');
    res.send("Hello dear API");
})

app.get('/things', (req, res) => {
    const limit = req.query.limit;

    let i = 0;
    const newThings = things.filter(item => {
        if (i < limit) {
            i += 1;
            return true;
        }
        return false;
    })
    console.log(req.query.limit)
    res.send(newThings);
})

app.get('/things/name/:name/', (req, res) => {
    console.log(req.params);
    console.log(typeof req.params.name);

    const thing = things.find((thing) => thing.name === req.params.name);

    if (thing) {
        res.send(thing);
    } else {
        res.sendStatus(404);
    }

})

app.get('/things/:id', (req, res) => {
    const parsedThingId = parseInt(req.params.id);
    const thing = things.find((thing) => thing.id === parsedThingId)

    if (thing) {
        res.send(thing);
    } else {
        res.sendStatus(404);
    }
});

app.listen(servPort, () => console.log("api is running"));
