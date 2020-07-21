import { hash } from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
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
  });

  User.beforeCreate(async (user) => {
    const hashedPassword = await hash(user.password, 12);
    user.password = hashedPassword;
  });

  User.associate = (models) => {
    User.hasMany(models.Address, {
      as: 'addresses',
      foreignKey: 'userId'
    });

    User.hasMany(models.Grocery, {
      as: 'groceries',
      foreignKey: 'userId'
    });
  };

  return User;
};
