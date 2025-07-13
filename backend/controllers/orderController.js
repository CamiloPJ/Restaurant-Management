import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing user order from frontend
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      amount: req.body.amount,
      address: req.body.address,
      status: "recibido",
      date: new Date(), // Añadimos la fecha actual
    });
    const [savedOrder] = await Promise.all([
      newOrder.save(),
      userModel.findByIdAndUpdate(
        req.body.userId,
        { cartData: {} }, // Asegúrate que coincida con tu modelo de usuario
        { new: true }
      ),
    ]);
    res.json({
      success: true,
      message: "Pedido recibido con éxito",
      orderId: savedOrder._id,
      orderNumber: `ORD-${savedOrder._id.toString().slice(-6).toUpperCase()}`,
    });
  } catch (error) {
    console.error("Error en placeOrder:", error);
    res.status(500).json({
      success: false,
      message: "Error al procesar el pedido",
      error: error.message,
    });
  }
};

export { placeOrder };
