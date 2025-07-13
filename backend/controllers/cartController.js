import userModel from "../models/userModel.js"

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Validación básica
        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Datos incompletos" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        // Clonar cartData
        const updatedCart = { ...user.cartData };

        // Actualizar cantidad
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;

        // Guardar en BD
        await userModel.findByIdAndUpdate(
            userId,
            { cartData: updatedCart },
            { new: true, runValidators: true }
        );

        res.json({ success: true, message: "Added To Cart", cart: updatedCart });
    } catch (error) {
        console.error("Error en addToCart:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

//Remove items user cart
const removeToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        const updatedCart = { ...user.cartData };

        if (!updatedCart[itemId]) {
            return res.status(400).json({ success: false, message: "El ítem no existe en el carrito" });
        }

        updatedCart[itemId] -= 1;

        if (updatedCart[itemId] <= 0) {
            delete updatedCart[itemId]; // Eliminar si la cantidad es 0
        }

        await userModel.findByIdAndUpdate(
            userId,
            { cartData: updatedCart },
            { new: true }
        );

        res.json({ success: true, message: "Item removed", cart: updatedCart });
    } catch (error) {
        console.error("Error en removeFromCart:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

//fetch user cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        res.json({ success: true, cart: user.cartData });
    } catch (error) {
        console.error("Error en getCart:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

export{addToCart, removeToCart, getCart}