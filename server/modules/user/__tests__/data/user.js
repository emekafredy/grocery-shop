export const validUserInput = {
  name: 'Jane',
  email: 'em@gmail.com',
  password: '123456789',
  confirmPassword: '123456789'
};

export const validVendorInput = {
  name: 'John',
  email: 'john@mail.com',
  password: '123456789',
  vendorName: 'vendor123',
  role: 'vendor'
};

export const validAdminInput = {
  name: 'John',
  email: 'john@mail.com',
  password: '123456789',
  vendorName: 'vendor123',
  role: 'admin'
};

export const missingInputValues = {
  name: 'Jane',
  email: '',
  password: '123456789',
  confirmPassword: '123456789'
};

export const shortNameInput = {
  name: 'Ma',
  email: 'em@mail.com',
  password: '123456789',
  confirmPassword: '123456789'
};

export const invalidEmailInput = {
  name: 'Jane',
  email: 'em@mai',
  password: '123456789',
  confirmPassword: '123456789'
};

export const shortPasswordInput = {
  name: 'Jane',
  email: 'em@mail.com',
  password: '12345',
  confirmPassword: '12345'
};

export const invalidConfirmPasswordInput = {
  name: 'Jane',
  email: 'em@mail.com',
  password: '123456789',
  confirmPassword: '123456709'
};

export const duplicateUserInput = {
  name: 'Jane',
  email: 'em@gmail.com',
  password: '123456789',
  confirmPassword: '123456789'
};

export const validLoginInput = {
  email: 'em@gmail.com',
  password: '123456789',
};

export const invalidLoginInput = {
  email: 'em@gmail.com',
  password: '1234567800',
};

export const validUpdateInput = {
  name: 'Jane Smith',
};

export const validVendorLoginInput = {
  email: 'john@mail.com',
  password: '123456789',
};

export const duplicateVendorInput = {
  name: 'Johnny',
  email: 'johnny@mail.com',
  password: '123456789',
  vendorName: 'vendor123',
  role: 'vendor'
};

export const usersData = [
  {
    name: 'John Doe',
    email: 'j.doe@mail.com',
    password: '123456789',
    role: 'vendor'
  }, {
    name: 'Jane Smith',
    email: 'j.smith@mail.com',
    password: '123456789',
  }
];

export const usersDataII = [
  {
    name: 'Doe Smith',
    email: 'd.smith@mail.com',
    password: '123456789',
    role: 'admin'
  }, {
    name: 'John Doe',
    email: 'j.doe@mail.com',
    password: '123456789',
    role: 'vendor'
  }
];
