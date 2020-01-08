const cmd = require('chronos-microservice-debugger2');

cmd.propagate();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

const PORT = 7777;
//  we're using the chronos debugger tool here to intercept
//  request and propagate our context onto said request as it travels
// app.use('/', cmd.microCom('orders_microservice', 'sql', 'postgres://tsfcbdjo:l8AWzEJEyhxtR-ERoj7HNjIqBuRCqm9f@rajje.db.elephantsql.com:5432/tsfcbdjo'));
// cmd.microHealth('orders_microservice', 'sql', 'postgres://tsfcbdjo:l8AWzEJEyhxtR-ERoj7HNjIqBuRCqm9f@rajje.db.elephantsql.com:5432/tsfcbdjo', 'h');

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));
const controller = require('./OrderController');


// CHAOS FLOW
app.use((req, res, next) => {
  console.log(
    `***************************************************************************************
    CHAOS FLOW TEST --- METHOD:${req.method}, PATH: ${
  req.url
}, BODY: ${JSON.stringify(req.body)}, ID: ${req.query.id}
    ***************************************************************************************`,
  );
  next();
});


// Create an Order through this endpoint
app.post('/createorder', controller.createorder, (req, res) => {
  res.status(200).json(res.locals.createorder);
});

// Get all orders through this endpoint
app.get('/getorders', controller.getorders, (req, res) => {
  res.status(200).json(res.locals.getorders);
});

// Delete order through this endpoint
app.delete('/deleteorder:id?', controller.deleteorder, (req, res) => {
  res.status(200).json(res.locals.deletecustomer);
});

// Get customer info from the customers application with this endpoint
app.get('/customerdata', controller.fetchcustomerdata, (req, res) => {
  //  console.log(`This is the outgoing response ${JSON.stringify(res.locals.customerdata)}`);
  res.status(200).json((res.locals.customerdata));
});

//  open and listen to server on this port
app.listen(PORT, () => {
  console.log(`Orders server running on port ${PORT}...`);
});