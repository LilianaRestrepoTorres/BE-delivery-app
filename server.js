const express = require('express');
const app = express();
const port = 9393;

//Middleware
app.use(express.json());

const robots = [
    {"id": 1, "name": "Robot 1", "status": "available"},
    {"id": 2, "name": "Robot 2", "status": "busy"},
    {"id": 3, "name": "Robot 3", "status": "reserved"},
]

// Main root of the server
app.get('/', (req, res) => {
    res.status(200).send({message: 'Hello! This is backend of delivery app.'});
})

app.get('/robots', (req, res) => {
    res.status(200).send(robots);
})

// Endpoint for getting robot by id
app.get('/robots/:id', (req, res) => {
    const {id} = req.params;
    const robot = robots.find(robot => robot.id == id);
    if (!robot) {
        return res.status(404).send({message: 'Robot not found'});
    }
    res.status(200).send(robot);
})

// Endpoint for getting robot by status
app.get('/robots/:status', (req, res) => {
    const {status} = req.params;
    if (!status) {
        return res.status(404).send({message: 'Bad request'});
    }
    res.status(200).send({robots: robots.filter(robot => robot.status === status)});
})

app.post('/', (req, res) => {
    const {robot} = req.body;
    if (!robot) {
        return res.status(400).send({message: 'Robot is required'});
    }
    res.status(200).send({message: `Your robot is called: ${robot}`});
})

app.put('/', (req, res) => {
    
})

app.delete('/', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
