const warehouseModel = (sequelize, Sequelize) => {

    const warehouseManagement = sequelize.define('warehouseManagement', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productName:{
            type: Sequelize.STRING,
        },
        productDescription:{
            type: Sequelize.STRING,
        },
        productImage:{
            type: Sequelize.STRING
        },
        productImageExtension:{
            type: Sequelize.STRING
        },
        filepath:{
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
    },
    )
    return warehouseManagement;
}

export default warehouseModel;