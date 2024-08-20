const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;