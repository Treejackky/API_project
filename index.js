const hotels = require('./data_hotel');
const express = require('express');
const cors = require("cors");


const app = express(); 
const port = 8765;

app.use(cors());


app.get('/v1/hotels', (req, res) => {
  res.send({msg:hotels}); 
});

app.get('/v1/hotels:location', (req, res) => {
  const {location} = req.params;
  // console.log(location);
  const hotel = hotels.filter(hotel => hotel.location === location);
  console.log(hotel)
  res.send({msg:hotel});
});

app.post('/v1/cal_price'), (req, res) => {
  // param:room type,จำนวนวันที่จอง ไปยัง
  const {room, total_days} = req.body;
  
  let price = room.price * total_days;
  // vat 7% 
  let vat = price * 0.07;

  console.log(price);
  
  res.send({msg:hotels});
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
