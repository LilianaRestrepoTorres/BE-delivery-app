const express = require('express');
const app = express();
const port = 9393;

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
