const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login:{type: DataTypes.STRING, unique: true, allowNull: false},
    password:{type: DataTypes.STRING, allowNull: false},
    role:{type: DataTypes.STRING, allowNull: false, defaultValue: "USER"}
}, {timestamps: false})

const Claim = sequelize.define('claim', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false},
    img:{type: DataTypes.STRING, allowNull: false},
    status:{type: DataTypes.STRING, allowNull: false},
    userId:{type: DataTypes.INTEGER, allowNull: false}
}, {timestamps: false})

User.hasMany(Claim, { foreignKey: 'userId'})
Claim.belongsTo(User, { foreignKey: 'userId'})

User.hasMany(Claim, { foreignKey: 'managerId'})
Claim.belongsTo(User, { foreignKey: 'managerId'})

User.hasMany(Claim, { foreignKey: 'adminId'})
Claim.belongsTo(User, { foreignKey: 'adminId'})

module.exports = {
    User,
    Claim
}