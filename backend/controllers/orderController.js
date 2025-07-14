import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { body, validationResult } from 'express-validator';


// Validaciones para el pedido
const validateOrder = [
  body('userId').notEmpty().isMongoId().withMessage('ID de usuario inválido'),
  body('items').isArray({ min: 1 }).withMessage('Debe haber al menos 1 ítem'),
  body('items.*._id').notEmpty().isMongoId().withMessage('ID de producto inválido'),
  body('items.*.name').notEmpty().trim().withMessage('Nombre de producto requerido'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Precio debe ser positivo'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Cantidad mínima: 1'),
  body('amount').isFloat({ min: 0 }).withMessage('Monto total inválido'),
  body('address').notEmpty().trim().withMessage('Dirección requerida'),
];

// Controlador con validaciones
const placeOrder = [
  ...validateOrder,
  async (req, res) => {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array().map(err => err.msg) 
      });
    }

    // procesar pedido
    try {
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
        status: "recibido",
        date: new Date(),
      });

      const [savedOrder] = await Promise.all([
        newOrder.save(),
        userModel.findByIdAndUpdate(
          req.body.userId,
          { cartData: {} },
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
  }
];

//User orders for frontend

const userOrders = async(req,res) => { 
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"})
        
    }
}


//Listing orders for admin panel 

const listOrder = async(req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }
}

export { placeOrder, userOrders, listOrder };