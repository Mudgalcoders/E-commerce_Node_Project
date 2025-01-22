import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from "../../../models/index.js";
import path from 'path';
const warehouseModel = db.warehouseModel

class warehouseController {
    static createWarehouse = async (req, res) => {
        try {
            // Destructure the body of the request
            const { productName, productDescription } = req.body;
            const { file } = req;

            console.log(file.path,"createWarehouse")
            // console.log(req.body, req.file, file.originalname, "createWarehouse");
            
            // Check if file is uploaded
            let productImage = null;
            let productImageExtension = null;
            let filepath = null;
            if (file) {
                productImage = file.filename;  // Store the filename
                productImageExtension = path.extname(file.originalname);  // Store the file extension
                filepath = file.path
            }
    
            // Create warehouse record in the database
            const newWarehouse = await warehouseModel.create({
                productName,
                productDescription,
                productImage,
                productImageExtension,
                filepath
            });
    
            return res.status(201).json({ message: 'Warehouse created successfully', newWarehouse });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error });
        }
    };

    // Controller to get a list of all warehouses
static getWarehouses = async (req, res) => {
    try {
        const warehouses = await warehouseModel.findAll({where:  { isDeleted : false }});
        // console.log(warehouses,"getWarehouses");
        return res.status(200).json({
            code: 200,
            message: "Folder Details",
            data: warehouses
        });
        
        // return res.status(200).json(warehouses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to update a warehouse
static updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, productDescription } = req.body;
        const { file } = req;

        const warehouse = await warehouseModel.findByPk(id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        if (file) {
            warehouse.productImage = file.filename;
            warehouse.productImageExtension = path.extname(file.originalname);
        }

        warehouse.productName = productName || warehouse.productName;
        warehouse.productDescription = productDescription || warehouse.productDescription;

        await warehouse.save();

        return res.status(200).json({ message: 'Warehouse updated successfully', warehouse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to delete a warehouse
static deleteWarehouse = async (req, res) => {
    try {
        // const { id } = req.params;
        const warehouse = await warehouseModel.findAll({ where: { id: req.params.id, isDeleted: false }});
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        warehouse.isDeleted = true;
        await warehouse.save();

        return res.status(200).json({ message: 'Warehouse deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

}

export default warehouseController