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

// Endpoint for getting delivery by id
app.get('/deliveries/:id', async (req, res) => {
    const {id} = req.params;
    const deliveriesRef = db.collection('deliveries').doc('delivery');
    //const deliveries = await deliveriesRef.listCollections();
    const deliveries = await deliveriesRef.get();
    console.log(deliveries.data());
    deliveries.data().forEach(delivery => {
        console.log(delivery);
        // if(delivery.id === id) {
        //     res.status(200).send(delivery.data());
        // }
    })
    //const deliveries = await deliveriesRef.get();
    //const bots = deliveries.find(delivery => delivery.id === id);
    //console.log(bots);
    //const res2 = await deliveriesRef.isEqual(id);
    //console.log(res2);
    if(!deliveries.exists) {
        return res.status(404).send({message: 'Deliveries not found'});
    }
    
    //res.status(200).send(deliveries.data());
})

// Endpoint for creating new delivery into Firebase
app.post('/adddelivery', async (req, res) => {
    const {id, creation_date, state, pickup_lat, pickup_lon, dropoff_lat, dropoff_lon, zone_id} = req.body;
    const deliveriesRef = db.collection('deliveries').doc('delivery');
    const res2 = await deliveriesRef.set({
        [id]: {
            'creation_date': creation_date,
            'state': state,
            'pickup': {
                'pickup_lat': pickup_lat,
                'pickup_lon': pickup_lon
                },
            'dropoff': {
                'dropoff_lat': dropoff_lat,
                'dropoff_lon': dropoff_lon
                },
            'zone_id': zone_id
        }
    }, {merge: true});
    if (!res2) {
        return res.status(400).send({message: 'Delivery is required'});
    }
    res.status(200).send({message: `Your delivery was added successfully`});
})

// Endpoint to change delivery state
app.patch('/changestate', async (req, res) => {
    const {id, newState} = req.body;
    const deliveriesRef = db.collection('deliveries').doc('delivery');
    const res2 = await deliveriesRef.set({
        [id]: {
            'state': newState
        }
    }, {merge: true});
    if (!res2) {
        return res.status(400).send({message: 'Delivery is required'});
    }
    
    res.status(200).send({message: `Your delivery was updated successfully`});
})


// Bots Collection Firebase
// Endpoint for getting bots from Firebase
app.get('/bots', async (req, res) => {
    const botsRef = db.collection('bots');
    const snapshot = await botsRef.get();
    let array = [];
    snapshot.forEach(doc => {
        array.push(doc.data());
      });
    
    res.status(200).send(array);
})

// Endpoint for getting bot by id
app.get('/bots/:id', async (req, res) => {
    const {id} = req.params;
    const botsRef = db.collection('bots').doc(id);
    const bots = await botsRef.get();
    if(!bots.exists) {
        return res.status(404).send({message: 'Bot not found'});
    }
    
    res.status(200).send(bots.data());
})

// Endpoint for creating new bots into Firebase
app.post('/addbot', async (req, res) => {
    const {id, status, dropoff_lat, dropoff_lon, zone_id} = req.body;
    const botsRef = db.collection('bots');
    const res2 = await botsRef.doc(id).set({
        'status': status,
        'location': {
            'dropoff_lat': dropoff_lat,
            'dropoff_lon': dropoff_lon
            },
        'zone_id': zone_id
    }, {merge: true});
    if (!res2) {
        return res.status(400).send({message: 'Bot is required'});
    }
    res.status(200).send({message: `Your bot was added successfully`});
})

// Endpoint to change bot status
app.patch('/changebotstatus', async (req, res) => {
    const {id, newStatus} = req.body;
    const botsRef = db.collection('bots').doc(id);
    const res2 = await botsRef.set({
        'status': newStatus
    }, {merge: true});
    if (!res2) {
        return res.status(400).send({message: 'Bot is required'});
    }
    
    res.status(200).send({message: `Your bot was updated successfully`});
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
