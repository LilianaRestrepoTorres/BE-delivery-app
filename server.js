const express = require('express');
const app = express();
const port = 9393;
const { db } = require('./firebase.js');

//Middleware
app.use(express.json());

// Main root of the server
app.get('/', (req, res) => {
    res.status(200).send({message: 'Hello! This is backend of delivery app.'});
})

// Deliveries Collection Firebase
// Endpoint for getting deliveries from Firebase
app.get('/deliveries', async (req, res) => {
    const deliveriesRef = db.collection('deliveries').doc('delivery');
    const deliveries = await deliveriesRef.get();
    if(!deliveries.exists) {
        return res.status(404).send({message: 'Deliveries not found'});
    }
    
    res.status(200).send(deliveries.data());
})


// Endpoint for creating new delivery into Firebase
app.post('/adddelivery', async (req, res) => {
    const {id, creation_date, state} = req.body;
    const deliveriesRef = db.collection('deliveries').doc('delivery');
    const res2 = await deliveriesRef.set({
        [id]: {
            'creation_date': creation_date,
            'state': state
        }
    }, {merge: true});
    if (!res2) {
        return res.status(400).send({message: 'Delivery is required'});
    }
    res.status(200).send({message: `Your delivery was added successfully`});
})

// Endpoint to change delivery state
app.patch('/changestate', async (req, res) => {
    const {id, creation_date, newState} = req.body;
    const deliveriesRef = db.collection('deliveries').doc('delivery');
    const res2 = await deliveriesRef.set({
        [id]: {
            'creation_date': creation_date,
            'state': newState
        }
    }, {merge: true});
    if (!res2) {
        return res.status(400).send({message: 'Delivery is required'});
    }
    
    res.status(200).send({message: `Your delivery was updated successfully`});
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
