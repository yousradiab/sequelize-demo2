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
