# sequelize-demo2

install the packages:
```bash
npm install
```

in index.js edit the code (fill in your credentials and database name)

```js
const sequelize = new Sequelize("database2", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});
```

create an empty database:
```sql
CREATE DATABASE database2;
``````

Now run the server:
```bash
npm start
```

This will create the tables and populates them with the sample data.

in the browser, you can go to localhost:3000/orders to see the data

you should see something like this:
```json
[
  {
  "id": 1,
  "orderNumber": "ORD123",
  "createdAt": "2023-11-16T08:33:20.000Z",
  "updatedAt": "2023-11-16T08:33:20.000Z",
  "OrderItems": [
    {
    "id": 1,
    "quantity": 2,
    "createdAt": "2023-11-16T08:33:20.000Z",
    "updatedAt": "2023-11-16T08:33:20.000Z",
    "OrderId": 1,
    "ProductId": 1,
    "Product": {
      "id": 1,
      "productName": "Product A",
      "price": "19.99",
      "createdAt": "2023-11-16T08:33:20.000Z",
      "updatedAt": "2023-11-16T08:33:20.000Z"
    }
},
```