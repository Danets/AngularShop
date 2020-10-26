const Order = require("../models/Order");
const moment = require("moment");

const errorHandler = require("../utils/errorHandler");

module.exports.overview = async (req, res) => {
  try {
    const allOrders = await Order.find({ user: req.user.id }).sort(1);
    const ordersMap = getOrdersMap(allOrders);
    // AMOUNT OF ORDERS
    const amountOrders = allOrders.length;
    // AMOUNT OF ORDERS PER YESTERDAY
    const ordersPerYersteday =
      ordersMap[moment().add(-1, "d").format("DD.MM.YYYY")] || [];
    const amountOrdersPerYersteday = ordersPerYersteday.length;
    // AMOUNT OF DAYS
    const amoutDays = Object.keys(ordersMap).length;
    // ORDERS PER DAY
    const ordersPerDay = (amountOrders / amoutDays).toFixed(0);
    // PERCENT FOR AMOUNT OF ORDERS
    const percentForOrders = (
      (amountOrdersPerYersteday / ordersPerDay - 1) *
      100
    ).toFixed(2);
    // COMMON PROFIT
    const commonProfit = calculatePrise(allOrders);
    // PROFIT PER DAY
    const profitPerDay = commonProfit / amoutDays;
    // PROFIT PER YERSTEDAY
    const profitPerLastDay = calculatePrise(ordersPerYersteday);
    // PERCENT OF PROFIT
    const percentForProfit = (
      (profitPerLastDay / profitPerDay - 1) *
      100
    ).toFixed(2);
    // COMPARING OF PROFIT
    const compareProfit = (profitPerLastDay - profitPerDay).toFixed(2);
    // COMPARING OF ORDERS
    const compareOrders = (amountOrdersPerYersteday - ordersPerDay).toFixed(2);

    res.status(200).json({
      profit: {
        percent: Math.abs(+percentForProfit),
        compare: Math.abs(+compareProfit),
        last: +profitPerLastDay,
        isHigher: +percentForProfit > 0,
      },
      orders: {
        percent: Math.abs(+percentForOrders),
        compare: Math.abs(+compareOrders),
        last: +ordersPerYersteday,
        isHigher: +percentForOrders > 0,
      },
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.analytics = async (req, res) => {};

function getOrdersMap(orders = []) {
  const ordersByDay = {};
  orders.forEach((order) => {
    const keyDate = moment(order.date).format("DD.MM.YYYY");
    // CHECKING COMPARING KEY OF PREVIOUS AND CURRENT DAY
    if (keyDate === moment().format("DD.MM.YYYY")) {
      return;
    }
    if (!ordersByDay[keyDate]) {
      ordersByDay[keyDate] = [];
    }
    ordersByDay[keyDate].push(order);
  });
  return ordersByDay;
}

function calculatePrise(orders = []) {
  return orders.reduce((total, order) => {
    const ordersPrise = order.list.reduce((acc, curr) => {
      return (acc += curr.cost * curr.amount);
    }, 0);
    return (total += ordersPrise);
  }, 0);
}
