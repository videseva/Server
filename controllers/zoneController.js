const { json } = require("express/lib/response");
const { Op } = require("sequelize");
const Zone = require("../models/Zone");
const { use } = require("../routes/api");
const AWS = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');
const mime = require('mime-types');



// Crea una nueva instancia del servicio S3
const s3 = new AWS.S3();
const upload = multer();

exports.createZone = async (req, res) => {
    try {
        const bucketName = 's3-proyectoc';

        const base64String="";
        const { nombre, capacidad, idCategoria, foto, descripcion, noPermitido, disponibilidad } = req.body;
        const imageBuffer = Buffer.from(foto, 'base64');
        
        // Configurar la instancia S3
        const s3 = new AWS.S3();
        console.log('Valor de foto:', foto);
        const s3Params = {
            Bucket: bucketName,
            Key: nombre,
            Body: imageBuffer,
            ContentType: 'image/png', 
        };
        // Subir la imagen a S3
        const s3UploadResult = await s3.upload(s3Params).promise();
        const fotoURL = s3UploadResult.Location; // La URL de la imagen en S3
        const z = {
            'idCuenta': req.user.idCuenta,
            'nombre': nombre,
            'capacidad': capacidad,
            'idCategoria': idCategoria,
            'foto': fotoURL,
            'estado': 1,
            'descripcion': descripcion,
            'noPermitido': noPermitido,
            'disponibilidad': disponibilidad,
        };
        
        const zone = await Zone.create(z);
        res.status(200).send(zone);
        console.log("Esta es la foto de la url: ", fotoURL)
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
                },
                idCuenta: req.user.idCuenta
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
        const { id, nombre, capacidad, idCategoria, foto, descripcion, noPermitido, disponibilidad, estado } = req.body;
        const zoneId = id;
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
        zone.noPermitido = noPermitido;
        zone.disponibilidad = disponibilidad;
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
            res.status(500).json({ message: 'Zona no encontrada' });
        }
        zone.estado = 3;
        await zone.save();
        res.status(200).send(zone);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}