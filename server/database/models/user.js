import { hash } from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vendorName: {
      unique: true,
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('user', 'vendor', 'delivery', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  });

  User.beforeCreate(async (user) => {
    const hashedPassword = await hash(user.password, 12);
    user.password = hashedPassword;
  });

  User.associate = (models) => {
    User.hasMany(models.Grocery, {
      as: 'groceries',
      foreignKey: 'vendorId'
    });
  };

  return User;
};
