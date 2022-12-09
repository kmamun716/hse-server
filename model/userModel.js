module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      district:{
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      }
    });
  
    return User;
  };