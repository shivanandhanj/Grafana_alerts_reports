// metrics/metrics.js
const client = require('prom-client');
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const ordersPlaced = new client.Counter({
  name: 'ecommerce_orders_placed_total',
  help: 'Total number of orders placed',
});
const failedLogins = new client.Counter({
  name: 'ecommerce_failed_logins_total',
  help: 'Failed login attempts',
});
const paymentSuccess = new client.Counter({
  name: 'ecommerce_payment_success_total',
  help: 'Successful payments',
});
const paymentFailures = new client.Counter({
  name: 'ecommerce_payment_failure_total',
  help: 'Failed payments',
});
const lowStockGauge = new client.Gauge({
  name: 'ecommerce_products_low_stock',
  help: 'Number of product variants below stock threshold',
});

register.registerMetric(ordersPlaced);
register.registerMetric(failedLogins);
register.registerMetric(paymentSuccess);
register.registerMetric(paymentFailures);
register.registerMetric(lowStockGauge);

module.exports = {
  register,
  ordersPlaced,
  failedLogins,
  paymentSuccess,
  paymentFailures,
  lowStockGauge,
};
