module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Categories', [
    {
      name: 'Beverages',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Bakery',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Canned Goods',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Dairy',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Baking Goods',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Frozen Foods',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Fruits & Vegies',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Cleaners',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Toiletries',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Others',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Categories', null, {})
};
