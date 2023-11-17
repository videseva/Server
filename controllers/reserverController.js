const { json } = require("express/lib/response");
const Reserver = require("../models/Reserver");
const { Op } = require("sequelize");
exports.createReserver = async (req, res) => {
    try {
        const { idCategoria, idZone,descripcion,horario,fechaReserver } = req.body;
        const r = {
            'idCuenta':  req.user.idCuenta,
            'idCategoria': idCategoria,
            'idZone': idZone,
            'idUser': req.user.id,
            'descripcion': descripcion,
            'horario': horario,
            'fechaReserver': fechaReserver,
            'estado': 1
        };
        const reserver = await Reserver.create(r);
        res.status(200).send(reserver);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.listReserver = async (req, res) => {
    try {
        
        const reservers = await Reserver.findAll({
            where: {
                estado: {
                    [Op.or]: [1, 2]
                },
                idCuenta:  req.user.idCuenta
              }
        });
        res.status(200).send(reservers);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.getReserver = async (req, res) => {
    try {
        const {id} = req.body;
        const reserver = await Reserver.findByPk(id);
        if (!reserver) {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
      
        res.status(200).send(reserver);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.updateReserver = async (req, res) => {
    try {
        const { id,idCategoria, idZone,descripcion,horario,fechaReserver, estado } = req.body;
        const reserverId = id;
        const reserver = await Category.findByPk(reserverId);
        if (!reserver) {
            res.status(404).json({ message: 'reservar no encontrada' });
        }
        reserver.descripcion = descripcion;
        reserver.fechaReserver = fechaReserver;
        reserver.horario = horario;
        reserver.estado = estado;
        await reserver.save();
        res.status(200).send(reserver);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
exports.deleteReserver = async (req, res) => {
    try {
        const { id, nombre, estado, date} = req.body;
        const reserverId = id;
        const reserver = await Reserver.findByPk(reserverId);
        if (!reserver) {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
        reserver.estado = 3;
        await Reserver.save();
        res.status(200).send(reserver);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}