import request from 'supertest';
import app from '../../../../app';
import models from '../../../database/models';

import {
  validUserInput,
  missingInputValues,
  shortNameInput,
  invalidEmailInput,
  shortPasswordInput,
  invalidConfirmPasswordInput,
  duplicateUserInput,
  validVendorInput,
  validLoginInput,
  invalidLoginInput,
  validUpdateInput,
  validVendorLoginInput,
  duplicateVendorInput
} from './data/user';

describe('User Controller Spec', () => {
  beforeAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
  });

  afterAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
  });

  describe('Authentication', () => {
    describe('#register', () => {
      it('successfully registers a user', (done) => {
        request(app)
          .post('/api/users/register')
          .set('Content-Type', 'application/json')
          .send(validUserInput)
          .end((err, res) => {
            const { message, success } = res.body;

            expect(res.status).toEqual(201);
            expect(success).toEqual(true);
            expect(message).toEqual('Successful user registeration');
            if (err) return done(err);
            done();
          });
      });

      it('successfully registers a vendor', (done) => {
        request(app)
          .post('/api/vendors/register')
          .set('Content-Type', 'application/json')
          .send(validVendorInput)
          .end((err, res) => {
            const { message, success } = res.body;

            expect(res.status).toEqual(201);
            expect(success).toEqual(true);
            expect(message).toEqual('Successful user registeration');
            if (err) return done(err);
            done();
          });
      });

      it('throws a validation error when required data is missing', (done) => {
        request(app)
          .post('/api/users/register')
          .set('Content-Type', 'application/json')
          .send(missingInputValues)
          .end((err, res) => {
            const { errors, success } = res.body;

            expect(res.status).toEqual(422);
            expect(success).toEqual(false);
            expect(errors[0].param).toEqual('email');
            expect(errors[0].msg).toEqual('email is either absent or not valid');
            if (err) return done(err);
            done();
          });
      });

      it('throws a validation error when name length is short', (done) => {
        request(app)
          .post('/api/users/register')
          .set('Content-Type', 'application/json')
          .send(shortNameInput)
          .end((err, res) => {
            const { errors, success } = res.body;

            expect(res.status).toEqual(422);
            expect(success).toEqual(false);
            expect(errors[0].msg).toEqual('name must be at least 3 chars long');
            if (err) return done(err);
            done();
          });
      });

      it('throws a validation error when email is invalid', (done) => {
        request(app)
          .post('/api/users/register')
          .set('Content-Type', 'application/json')
          .send(invalidEmailInput)
          .end((err, res) => {
            const { errors, success } = res.body;

            expect(res.status).toEqual(422);
            expect(success).toEqual(false);
            expect(errors[0].msg).toEqual('email is either absent or not valid');
            if (err) return done(err);
            done();
          });
      });

      it('throws a validation error when password length is short', (done) => {
        request(app)
          .post('/api/users/register')
          .set('Content-Type', 'application/json')
          .send(shortPasswordInput)
          .end((err, res) => {
            const { errors, success } = res.body;

            expect(res.status).toEqual(422);
            expect(success).toEqual(false);
            expect(errors[0].msg).toEqual('password must be at least 8 chars long');
            if (err) return done(err);
            done();
          });
      });

      it('throws a validation error when password and confirmPassword don\'t match', (done) => {
        request(app)
          .post('/api/users/register')
          .set('Content-Type', 'application/json')
          .send(invalidConfirmPasswordInput)
          .end((err, res) => {
            const { errors, success } = res.body;

            expect(res.status).toEqual(422);
            expect(success).toEqual(false);
            expect(errors[0].msg).toEqual('confirm password doesn\'t match with password');
            if (err) return done(err);
            done();
          });
      });

      it('throws a duplication error when email already exists in the database', (done) => {
        request(app)
          .post('/api/users/register')
          .set('Content-Type', 'application/json')
          .send(duplicateUserInput)
          .end((err, res) => {
            const { errors, success } = res.body;

            expect(res.status).toEqual(409);
            expect(success).toEqual(false);
            expect(errors[0].msg).toEqual('Email has already been used');
            if (err) return done(err);
            done();
          });
      });

      it('throws a duplication error when vendorName already exists in the database', (done) => {
        request(app)
          .post('/api/vendors/register')
          .set('Content-Type', 'application/json')
          .send(duplicateVendorInput)
          .end((err, res) => {
            const { errors, success } = res.body;

            expect(res.status).toEqual(409);
            expect(success).toEqual(false);
            expect(errors).toEqual('Vendor name has already been used');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('#login', () => {
      it('successfully signs in a registered user', (done) => {
        request(app)
          .post('/api/users/login')
          .set('Content-Type', 'application/json')
          .send(validLoginInput)
          .end((err, res) => {
            const { message, success } = res.body;

            expect(res.status).toEqual(200);
            expect(success).toEqual(true);
            expect(message).toEqual('Successful Login');
            if (err) return done(err);
            done();
          });
      });

      it('throws a validation error when login data is invalid', (done) => {
        request(app)
          .post('/api/users/login')
          .set('Content-Type', 'application/json')
          .send(invalidLoginInput)
          .end((err, res) => {
            const { errors, success } = res.body;

            expect(res.status).toEqual(400);
            expect(success).toEqual(false);
            expect(errors[0].msg).toEqual('Email or password is incorrect');
            if (err) return done(err);
            done();
          });
      });
    });
  });

  describe('User Profile', () => {
    let token; let vendorToken;
    const invalidToken = '77895iu0imxm090500g59050v00v00nc5';

    beforeAll(async () => {
      const user = await request(app).post('/api/users/login').send(validLoginInput);
      const vendor = await request(app).post('/api/users/login').send(validVendorLoginInput);
  
      // eslint-disable-next-line prefer-destructuring
      token = user.body.token;
      vendorToken = vendor.body.token;
    });

    describe('#allUsers', () => {
      it('gets all users', (done) => {
        request(app)
          .get('/api/users')
          .set('Content-Type', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            const { message, success, users } = res.body;

            expect(res.status).toEqual(200);
            expect(success).toEqual(true);
            expect(message).toEqual('Users retrieved');
            expect(users.length).toEqual(2);
            expect(users[0].name).toEqual('Jane');
            if (err) return done(err);
            done();
          });
      });

      it('throws an authorization error when token is invalid', (done) => {
        request(app)
          .get('/api/users')
          .set('Content-Type', 'application/json')
          .set('authorization', invalidToken)
          .end((err, res) => {
            const { errors, success } = res.body;

            expect(res.status).toEqual(401);
            expect(success).toEqual(false);
            expect(errors).toEqual('Invalid token. Please sign in again.');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('#getUser', () => {
      it('gets the logged in user profile', (done) => {
        request(app)
          .get('/api/user')
          .set('Content-Type', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            const { message, success, user } = res.body;

            expect(res.status).toEqual(200);
            expect(success).toEqual(true);
            expect(message).toEqual('User retrieved');
            expect(user.name).toEqual('Jane');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('#updateUserProfile', () => {
      it('succesfully updates logged in user\'s profile', (done) => {
        request(app)
          .put('/api/user')
          .set('Content-Type', 'application/json')
          .set('authorization', token)
          .send(validUpdateInput)
          .end((err, res) => {
            const { success, user } = res.body;

            expect(res.status).toEqual(200);
            expect(success).toEqual(true);
            expect(user.name).toEqual('Jane Smith');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('#allVendors', () => {
      it('fetches all vendors', (done) => {
        request(app)
          .get('/api/vendors')
          .set('Content-Type', 'application/json')
          .set('authorization', vendorToken)
          .end((err, res) => {
            const { success, vendors } = res.body;

            expect(res.status).toEqual(200);
            expect(success).toEqual(true);
            expect(vendors.length).toEqual(1);
            expect(vendors[0].name).toEqual('John');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('#getVendor', () => {
      it('gets a vendor\'s profile', (done) => {
        request(app)
          .get('/api/vendor/vendor123')
          .set('Content-Type', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            const { success, vendor } = res.body;

            expect(res.status).toEqual(200);
            expect(success).toEqual(true);
            expect(vendor.name).toEqual('John');
            expect(vendor.role).toEqual('vendor');
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
