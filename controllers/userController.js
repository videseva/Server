const { json } = require("express/lib/response");
const { Op } = require("sequelize");
const User = require("../models/User");
const { use } = require("../routes/api");

exports.createUser = async (req, res) => {
    try {
        const { nombre, genero, telefono, correo, direccion, contrasena } = req.body;
        const c = {
            'idCuenta': req.user.idCuenta,
            'nombre': nombre,
            'genero': genero,
            'telefono': telefono,
            'correo': correo,
            'direccion': direccion,
            'contrasena': contrasena,
            'tipoUser': 3,
            'estado': 1,

        };
        const user = await User.create(c);
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.listUser = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                estado: {
                    [Op.or]: [1, 2]
                }, idCuenta: req.user.idCuenta
            }
        });
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.getUser = async (req, res) => {
    try {

        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrada' });
        }

        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.updateUser = async (req, res) => {
    try {
        const { idCuenta, nombre, genero, telefono, direccion, contrasena, tipoUser, estado } = req.body;
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'Usuario  no encontrado' });
        }
        user.idCuenta = userId;
        user.nombre = nombre;
        user.genero = genero;
        user.telefono = telefono;
        user.direccion = direccion;
        user.contrasena = contrasena;
        user.tipoUser = tipoUser;
        user.estado = estado;
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
exports.deleteUser = async (req, res) => {
    try {
        const { id, nombre, genero, telefono, direccion, tipoUser, estado, date } = req.body;
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrada' });
        }
        user.estado = 3;
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}