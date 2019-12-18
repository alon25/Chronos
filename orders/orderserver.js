const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const PORT = 7777;
app.use(bodyParser.json());

const controller = require('./OrderController');

// const mw = require('../mwMongo.js');

// app.use('/', mw.microCom(path.basename(__filename)));


// CHAOS FLOW
// app.use((req, res, next) => {
//   console.log(
//     `***************************************************************************************
//     CHAOS FLOW TEST --- METHOD:${req.method}, PATH: ${
//   req.url
// }, BODY: ${JSON.stringify(req.body)}, ID: ${req.query.id}
//     ***************************************************************************************`,
//   );
//   next();
// });


// Create an Order through this endpoint
app.post('/createorder', controller.createorder, (req, res) => {
  console.log(`This is the order I just posted ${res.locals.createorder}`);
  res.status(200).json(res.locals.createorder);
});

// Get all orders through this endpoint
app.get('/getorders', controller.getorders, (req, res) => {
  res.status(200).json(res.locals.getorders);
});

// Get customer info from the customers application with this endpoint
app.get('/customerdata', controller.fetchcustomerdata, (req, res) => {
  //  console.log(`This is the outgoing response ${JSON.stringify(res.locals.customerdata)}`);
  res.status(200).json((res.locals.customerdata));
});


//  ********* NOT NEEDED BUT HOLD DELETING FOR NOW ***********
// app.get('/order/:id', (req, res, next) => {
//   Order.findById(req.params.id)
//     .then((order) => {
//       let orderObject;
//       axios.get(`http://localhost:5555/customer/${order.CustomerID}`)
//         .then((res) => {
//           orderObject = { customerName: res.data.name, bookTitle: '' };
//           axios.get(`http://localhost:4545/book/${order.BookID}`)
//             .then((res) => {
//               orderObject.bookTitle = res.data.title;
//             })
//             .catch((err) => {
//               Promise.reject(err);
//             });
//         })
//         .catch((err) => {
//           Promise.reject(err);
//         });
//     })
//     .catch((err) => {
//       Promise.reject(err);
//     });
//   next();
// });
// **************** END ***************
app.listen(PORT, () => {
  console.log(`Orders server running on port ${PORT}...`);
});