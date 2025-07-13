import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Login user
const loginUser = [
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido"),

  body("password").notEmpty().withMessage("La contraseña es requerida"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }

    const { email, password } = req.body;

    try {
      // Buscar usuario
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "El usuario no existe",
        });
      }

      // Verificar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        });
      }

      // Generar token JWT
      const token = createToken(user._id);
      //   jwt.sign(
      //     { userId: user._id },
      //     process.env.JWT_SECRET,
      //     { expiresIn: '1d' }
      //   );

      res.json({
        success: true,
        message: "Inicio de sesión exitoso",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error al iniciar sesión",
      });
    }
  },
];

//Register user
const registerUser = [
  // Validaciones con express-validator
  body("name")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/)
    .withMessage("Debe contener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("Debe contener al menos un número")
    .matches(/[\W_]/)
    .withMessage("Debe contener al menos un carácter especial"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }

    const { name, password, email } = req.body;

    try {
      // Verifica si el email ya existe
      const exists = await userModel.findOne({ email });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "El usuario ya existe",
        });
      }

      // Hash de la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear nuevo usuario
      const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const user = await newUser.save();

      // Generar token JWT
      const token = createToken(user._id);

      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error al registrar el usuario",
      });
    }
  },
];

export { loginUser, registerUser };
