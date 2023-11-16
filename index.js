import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
const PORT = 3000;

// Create a Sequelize instance
const sequelize = new Sequelize("database2", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

// Define models for orders, order_items, and products
const Order = sequelize.define("Order", {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Product = sequelize.define("Product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

const OrderItem = sequelize.define("OrderItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations between the models
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

// Sync the models with the database
async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to recreate tables on every app start
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

// Create sample data
async function createSampleData() {
  try {
    // Create a sample order
    const order = await Order.create({
      orderNumber: "ORD123",
    });

    // Create sample products
    const product1 = await Product.create({
      productName: "Product A",
      price: 19.99,
    });

    const product2 = await Product.create({
      productName: "Product B",
      price: 29.99,
    });

    // Associate products with order through order items
    await OrderItem.create({
      quantity: 2,
      OrderId: order.id,
      ProductId: product1.id,
    });

    await OrderItem.create({
      quantity: 1,
      OrderId: order.id,
      ProductId: product2.id,
    });

    console.log("Sample data created");
  } catch (error) {
    console.error("Error creating sample data:", error);
  }
}

// Middleware for syncing the database and running example functions
app.use(async (req, res, next) => {
  await syncDatabase();
  //await createSampleData();
  next();
});

// Fetch all orders with associated order items and products
// Fetch all orders with associated order items and products
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });

    // create a DTO
    // const dto = orders.map((order) => {
    //   return {
    //     orderNumber: order.orderNumber,
    //     orderItems: order.OrderItems.map((orderItem) => {
    //       return {
    //         quantity: orderItem.quantity,
    //         product: {
    //           productName: orderItem.Product.productName,
    //           price: orderItem.Product.price,
    //         },
    //       };
    //     }),
    //   };
    // });

    //res.json(dto);

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
