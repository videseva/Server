const { json } = require("express/lib/response");
const { Op } = require("sequelize");
const Account = require("../models/Account");

exports.createAccount = async (req, res) => {
    try {
        const { nombre,telefono,correo, direccion} = req.body;
        const c = {
            'nombre': nombre,
            'telefono': telefono,
            'correo': correo,
            'direccion': direccion,
            'estado': 1,
           
        };
        const account = await Account.create(c);

        
        res.status(200).send(account);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.listAccount= async (req, res) => {
    try {
        const accounts = await Account.findAll({
            where: {
                estado: {
                    [Op.or]: [1, 2]
                }
              }
        });
        res.status(200).send(accounts);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.getAccount = async (req, res) => {
    try {
        
        const accountId = req.user.idCuenta;
        const account = await Account.findByPk(accountId);
        if (!account) {
            res.status(404).json({ message: 'Cuenta no encontrada' });
        }
      
        res.status(200).send(account);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.updateAccount = async (req, res) => {
    try {
        const { nombre,telefono,correo, direccion,estado} = req.body;
        const accountId = req.params.id;
        const account = await Account.findByPk(accountId);
        if (!account) {
            res.status(404).json({ message: 'Cuenta no encontrado' });
        }
        account.nombre = nombre;
        account.telefono = telefono;
        account.correo = correo;
        account.direccion = direccion;
        account.estado = estado;
        await account.save();
        res.status(200).send(account);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
exports.deleteAccount = async (req, res) => {
    try {
        const { id,nombre, telefono,correro, direccion,estado, date} = req.body;
        const accountId = req.params.id;
        const account = await Account.findByPk(accountId);
        if (!account) {
            res.status(404).json({ message: 'Cuenta no encontrada' });
        }
        account.estado = 3;
        await account.save();
        res.status(200).send(account);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}