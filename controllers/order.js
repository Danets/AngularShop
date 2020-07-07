const Order = require("../models/Order");

const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
  const query = {
    user: req.user.id,
  };
  // PARAMETERS FOR FILTERS

  // DATE OF START
  if (req.query.start) {
    query.date = {
      $gte: req.query.start,
    };
  }

  // DATE OF END
  if (req.query.end) {
    if (!query.date) {
      query.date = {};
    }
    req.query["$lte"] = req.query.end;
  }
  //   CHEKING OUT FOR EXISTING ORDER IN REQUEST
  if (req.query.order) {
    query.order = +req.query.order;
  }
  try {
    //   HERE IS WE ARE USING offset AND LIMIT FOR INFINITE SCROLL
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit);
    res.status(200).json(orders);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    // LOOKING FOR LAST ORDER BY DATE
    const lastOrder = Order.findOne({
      user: req.user.id,
    }).sort({ date: -1 });
    const maxOrder = lastOrder ? lastOrder.order : 0;
    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1,
    }).save();
    res.status(201).json(order);
  } catch (e) {
    errorHandler(res, e);
  }
};
