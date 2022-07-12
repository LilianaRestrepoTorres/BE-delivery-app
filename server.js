const express = require('express');
const app = express();
const port = 9393;
const { db } = require('./firebase.js');

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

// Endpoint to get all robots
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

// Endpoint for creating new robot
app.post('/addrobot', (req, res) => {
    const {id, name, status} = req.body;
    const newRobot = {id, name, status};
    if (!newRobot) {
        return res.status(400).send({message: 'Robot is required'});
    }
    robots.push(newRobot);
    res.status(200).send({message: `Your robot was added successfully`});
})

// Endpoint for updating robot
app.patch('/updaterobot/:id', (req, res) => {
    const {id} = req.params;
    const {name, status} = req.body;
    const robot = robots.find(robot => robot.id == id);
    if (!robot) {
        return res.status(404).send({message: 'Robot not found'});
    }
    if (name) {
        robot.name = name;
    }
    if (status) {
        robot.status = status;
    }
    res.status(200).send(robot);
})

app.delete('/', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
