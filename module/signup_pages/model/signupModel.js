const signupModel = (sequelize, Sequelize) => {

    const userlogindetails = sequelize.define('userlogindetails', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName:{
            type: Sequelize.STRING,
        },
        userEmail:{
            type: Sequelize.STRING,
        },
        userPassword:{
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
    return userlogindetails;
}

export default signupModel;