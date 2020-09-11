import request from 'supertest';
import app from '../../../../app';
import models from '../../../database/models';
import { clearTables, generateTestToken } from '../../../helpers/specHelper';

import {
  validGroceryInput,
  missingGroceryInputValues,
  shortDescription,
  categoriesData,
  duplicateGroceryNameInput
} from './data/grocery';
import { usersData } from '../../user/__tests__/data/user';

describe('Grocery Controller Specs', () => {
  let vendorToken; let userToken;

  beforeAll(async () => {
    await clearTables();

    await models.Category.bulkCreate(categoriesData);
    await models.User.bulkCreate(usersData);

    vendorToken = await generateTestToken('j.doe@mail.com');
    userToken = await generateTestToken('j.smith@mail.com');
  });

  afterAll(async () => {
    await clearTables();
  });

  describe('#createGrocery', () => {
    it('successfully creates a grocery', (done) => {
      request(app)
        .post('/api/grocery/new')
        .set('Content-Type', 'application/json')
        .set('authorization', vendorToken)
        .send(validGroceryInput)
        .end((err, res) => {
          const { grocery, success } = res.body;

          expect(res.status).toEqual(201);
          expect(success).toEqual(true);
          expect(grocery.name).toEqual('Apple');
          if (err) return done(err);
          done();
        });
    });

    it('throws an authorization error if user is not an admin or vendor', (done) => {
      request(app)
        .post('/api/grocery/new')
        .set('Content-Type', 'application/json')
        .set('authorization', userToken)
        .send(validGroceryInput)
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(401);
          expect(success).toEqual(false);
          expect(errors).toEqual('You cannot perform this action');
          if (err) return done(err);
          done();
        });
    });

    it('throws an authorization error if token is not provided', (done) => {
      request(app)
        .post('/api/grocery/new')
        .set('Content-Type', 'application/json')
        .set('authorization', '')
        .send(validGroceryInput)
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(403);
          expect(success).toEqual(false);
          expect(errors).toEqual('Please provide a token');
          if (err) return done(err);
          done();
        });
    });

    it('throws a validation error if required data is missing', (done) => {
      request(app)
        .post('/api/grocery/new')
        .set('Content-Type', 'application/json')
        .set('authorization', vendorToken)
        .send(missingGroceryInputValues)
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(422);
          expect(success).toEqual(false);
          expect(errors[0].msg).toEqual('Name cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('throws a validation error if grocery description is short', (done) => {
      request(app)
        .post('/api/grocery/new')
        .set('Content-Type', 'application/json')
        .set('authorization', vendorToken)
        .send(shortDescription)
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(422);
          expect(success).toEqual(false);
          expect(errors[0].msg).toEqual('Grocery description must be at least 10 chars long');
          if (err) return done(err);
          done();
        });
    });

    it('throws a duplication error if grocery name already exists', (done) => {
      request(app)
        .post('/api/grocery/new')
        .set('Content-Type', 'application/json')
        .set('authorization', vendorToken)
        .send(duplicateGroceryNameInput)
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(409);
          expect(success).toEqual(false);
          expect(errors).toEqual('You already have a similar grocery');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#allGroceries', () => {
    it('fetches all groceries', (done) => {
      request(app)
        .get('/api/groceries')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { groceries, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(groceries[0].name).toEqual('Apple');
          if (err) return done(err);
          done();
        });
    });

    it('fetches all groceries with a keyword in name', (done) => {
      request(app)
        .get('/api/groceries?keyword=Apple')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { groceries, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(groceries[0].name).toEqual('Apple');
          if (err) return done(err);
          done();
        });
    });

    it('fetches all groceries with a keyword in description', (done) => {
      request(app)
        .get('/api/groceries?keyword=Fresh')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { groceries, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(groceries[0].name).toEqual('Apple');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#getGrocery', () => {
    it('fetches a grocery by id', (done) => {
      request(app)
        .get('/api/grocery/1')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { grocery, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(grocery.name).toEqual('Apple');
          if (err) return done(err);
          done();
        });
    });

    it('throws a 404 error if grocery does not exist', (done) => {
      request(app)
        .get('/api/grocery/2')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(404);
          expect(success).toEqual(false);
          expect(errors).toEqual('Grocery does not exist');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#updateGrocery', () => {
    it('updates a grocery name', (done) => {
      request(app)
        .put('/api/grocery/1')
        .set('Content-Type', 'application/json')
        .set('authorization', vendorToken)
        .send({ name: 'Orange' })
        .end((err, res) => {
          const { grocery, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(grocery.name).toEqual('Orange');
          if (err) return done(err);
          done();
        });
    });

    it('updates a grocery price', (done) => {
      request(app)
        .put('/api/grocery/1')
        .set('Content-Type', 'application/json')
        .set('authorization', vendorToken)
        .send({ price: 1500 })
        .end((err, res) => {
          const { grocery, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(grocery.price).toEqual(1500);
          if (err) return done(err);
          done();
        });
    });

    it('throws a 404 error if grocery does not exist', (done) => {
      request(app)
        .put('/api/grocery/2')
        .set('Content-Type', 'application/json')
        .set('authorization', vendorToken)
        .send({ name: 'Orange' })
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(404);
          expect(success).toEqual(false);
          expect(errors).toEqual('Grocery does not exist');
          if (err) return done(err);
          done();
        });
    });
  });
});
