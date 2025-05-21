// metrics/collectors.js
const { lowStockGauge } = require('./metrics');
const Product = require('../models/product.model'); // Adjust if needed

const checkLowStock = async () => {
  try {
    const threshold = 5;
    const lowStockVariants = await Product.aggregate([
      { $unwind: "$variants" },
      { $match: { "variants.stock": { $lt: threshold } } },
      { $count: "lowStockCount" }
    ]);

    const count = lowStockVariants.length > 0 ? lowStockVariants[0].lowStockCount : 0;
    lowStockGauge.set(count);
  } catch (err) {
    console.error("Low stock check failed:", err);
    lowStockGauge.set(0);
  }
};

// Schedule every 5 minutes
setInterval(checkLowStock, 5 * 60 * 1000);

module.exports = {
  checkLowStock,
};
