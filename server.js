const express = require('express');
const app = express();
const port = 9393;

//Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({message: 'Hello! This is backend of delivery app.'});
})

app.get('/:robot', (req, res) => {
    const {robot} = req.params;
    const {limit} = req.query;
    console.log(robot, limit);
    res.status(200).send({message: `You asked for a robot called ${robot} with limit ${limit}`});
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
