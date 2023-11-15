const { json } = require("express/lib/response");
const Category = require("../models/Category");
const { Op } = require("sequelize");
exports.createCategory = async (req, res) => {
    try {
        const { nombre } = req.body;
        const c = {
            'nombre': nombre,
            'estado': 1
        };
        const category = await Category.create(c);
        res.status(200).send(category);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.listCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: {
                estado: {
                    [Op.or]: [1, 2]
                }
              }
        });
        res.status(200).send(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getCategory = async (req, res) => {
    try {
        
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            res.status(404).json({ message: 'Categoria no encontrada' });
        }
      
        res.status(200).send(category);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.updateCategory = async (req, res) => {
    try {
        const { nombre, estado} = req.body;
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            res.status(404).json({ message: 'Categoria no encontrada' });
        }
        category.nombre = nombre;
        category.estado = estado;
        await category.save();
        res.status(200).send(category);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}
exports.deleteCategory = async (req, res) => {
    try {
        const { id, nombre, estado, date} = req.body;
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            res.status(404).json({ message: 'Categoria no encontrada' });
        }
        category.estado = 3;
        await category.save();
        res.status(200).send(category);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}