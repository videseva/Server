const { json } = require("express/lib/response");
const { Op } = require("sequelize");
const Zone = require("../models/Zone");
const { use } = require("../routes/api");

exports.createZone = async (req, res) => {
    try {
        const { idCuenta, nombre, capacidad,idCategoria,foto, descripcion} = req.body;
        const z = {
            'idCuenta': idCuenta,
            'nombre': nombre,
            'capacidad': capacidad,
            'idCategoria': idCategoria,
            'foto': foto,
            'descripcion': descripcion,
            'estado': 1,
           
        };
        const zone = await Zone.create(z);
        res.status(200).send(zone);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.listZone = async (req, res) => {
    try {
        const zones = await Zone.findAll({
            where: {
                estado: {
                    [Op.or]: [1, 2]
                }
              }
        });
        res.status(200).send(zones);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.getZone = async (req, res) => {
    try {
        
        const zoneId = req.params.id;
        const zone = await Zone.findByPk(zoneId);
        if (!zone) {
            res.status(404).json({ message: 'Zona no encontrada' });
        }
      
        res.status(200).send(zone);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.updateZone = async (req, res) => {
    try {  
        const { nombre, capacidad,idCategoria,foto, estado ,descripcion} = req.body;
        const zoneId = req.params.id;
        const zone = await Zone.findByPk(zoneId);
        if (!zone) {
            res.status(404).json({ message: 'Zona no encontrado' });
        }
      
        zone.nombre = nombre;
        zone.capacidad = capacidad;
        zone.idCategoria = idCategoria;
        zone.foto = foto;
        zone.estado = estado;
        zone.descripcion = descripcion;
        await zone.save();
        res.status(200).send(zone);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
exports.deleteZone = async (req, res) => {
    try {

        const zoneId = req.params.id;
        const zone = await Zone.findByPk(zoneId);
        if (!zone) {
            res.status(404).json({ message: 'Zona no encontrada' });
        }
        zone.estado = 3;
        await zone.save();
        res.status(200).send(zone);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}