const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const Connection = require('./db.js');
const router = require('./routes/AuthRouter.js');
const ProductRouter = require('./routes/ProductRouter.js');
Connection();
const PORT = process.env.PORT || 8080;
app.get('/ping', (req, res) => {

  res.send( 'pong' );
});
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', router);
app.use('/products', ProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});