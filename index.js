const hotels = require("./data_hotel");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8765;

app.use(cors());

app.use(express.json());

app.get("/v1/hotels", (req, res) => {
  res.send({ msg: hotels });
});

app.get("/v1/hotels:location", (req, res) => {
  const { location } = req.params;
  // console.log(location);
  const hotel = hotels.filter((hotel) => hotel.location === location);
  console.log(hotel);
  res.send({ msg: hotel });
});

app.get("/v1/hotels/rooms:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  // convert id int to string

  const hotel = hotels.filter((hotel) => hotel.id == id);
  // console.log()
  // const hotel = hotels.filter(hotel => hotel.id === id);
  // console.log(hotel)
  res.send({ msg: hotel });
});

// get data from hotel id
// app.get('/v1/hotels/:id', (req, res) => {
//   const {id} = req.params;
//   const hotel = hotels.find(hotel => hotel.id === id);
//   res.send({msg:hotel});
// });


app.post("/v1/cal_price", (req, res) => {
  const {
    rooms,
    base_price,
    locations,
    checkin,
    checkout,
    adult,
    childrens,
    room_num,
    id,
    hotel,
  } = req.body;

  console.log(
    rooms,
    base_price,
    locations,
    checkin,
    checkout,
    adult,
    childrens,
    room_num,
    id,
    hotel
  );

  const mocktel = hotels.filter((mocktel) => mocktel.id == id);

 console.log(mocktel);
  // find total day
  const date1 = new Date(checkin);
  const date2 = new Date(checkout);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // console.log(diffDays);

  // cal total_day x price_room

  const price = base_price * diffDays;

  const total_discount = 0;

  const price_after_discount = price - total_discount;

  const taxe_vat = price_after_discount * 0.07;

  const total_price = price_after_discount + taxe_vat;

  console.log(
    price,
    total_discount,
    price_after_discount,
    taxe_vat,
    total_price
  );

  res.send({
    msg: {
      rooms: rooms,
      base_price: base_price,
      checkin: checkin,
      checkout: checkout,
      adult: adult,
      childrens: childrens,
      room_num: room_num,
      hotel: mocktel,

      price : price,
      total_discount: total_discount,
      price_after_discount: price_after_discount,
      taxe_vat: taxe_vat,
      total_price: total_price,
    },
  });
});

// app.post('/v1/cal_price'), (req, res) => {
//   // param:room type,จำนวนวันที่จอง ไปยัง
//   const {room, total_days} = req.body;

//   let price = room.price * total_days;
//   // vat 7%
//   let vat = price * 0.07;

//   console.log(price);

//   res.send({msg:hotels});
// }

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
