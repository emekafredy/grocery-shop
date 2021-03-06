export const validGroceryInput = {
  name: 'Apple',
  description: 'Fresh and sweet apples available in small and large sizes',
  price: 500,
  categoryId: 1
};

export const missingGroceryInputValues = {
  name: '',
  description: 'Fresh and sweet apples available in small and large sizes',
  price: 500,
  categoryId: 1
};

export const shortDescription = {
  name: 'Orange',
  description: 'Fresh',
  price: 500,
  categoryId: 1
};

export const categoriesData = [
  { name: 'Fruits' },
  { name: 'Vegetables' }
];

export const groceriesData = [
  {
    name: 'Apple',
    description: 'Fresh and sweet apples available in small and large sizes',
    price: 500,
    categoryId: 1,
    vendorId: 1,
    discount: 50
  }, {
    name: 'Pumpkin Leaves',
    description: 'Fresh pumpkin leaves available',
    price: 250,
    categoryId: 2,
    vendorId: 1,
    discount: 50
  }
];

export const duplicateGroceryNameInput = {
  name: 'Apple',
  description: 'Apples gotten freshly from the farm',
  price: 2500,
  categoryId: 1
};
