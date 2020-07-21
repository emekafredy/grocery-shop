export default (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  });

  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };

  return Address;
};
