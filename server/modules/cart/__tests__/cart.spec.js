import request from 'supertest';
import app from '../../../../app';
import models from '../../../database/models';
import { clearTables } from '../../../helpers/specHelper';

import { validCartInput, invalidCartInput } from './data/cart';
import { groceriesData, categoriesData } from '../../grocery/__tests__/data/grocery';

describe('Cart Controller Specs', () => {
  beforeAll(async () => {
    await clearTables();

    await models.Category.bulkCreate(categoriesData);
    await models.Grocery.bulkCreate(groceriesData);
  });

  afterAll(async () => {
    await clearTables();
  });

  describe('#generateCartId', () => {
    it('generates a cartId', (done) => {
      request(app)
        .get('/api/shopping-cart/generateId')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.success).toEqual(true);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#addToCart', () => {
    it('successfully adds grocery to cart', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .send(validCartInput)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.success).toEqual(true);
          if (err) return done(err);
          done();
        });
    });

    it('throws a 404 error if grocery is not found in database', (done) => {
      request(app)
        .post('/api/shopping-cart/3')
        .set('Content-Type', 'application/json')
        .send(validCartInput)
        .end((err, res) => {
          const { success, errors } = res.body;

          expect(res.status).toEqual(404);
          expect(success).toEqual(false);
          expect(errors).toEqual('Grocery not found');
          if (err) return done(err);
          done();
        });
    });

    it('throws a duplication error for an already-added grocery', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .send(validCartInput)
        .end((err, res) => {
          const { success, errors } = res.body;

          expect(res.status).toEqual(409);
          expect(success).toEqual(false);
          expect(errors[0].msg).toEqual('You already have this grocery in your cart');
          if (err) return done(err);
          done();
        });
    });

    it('throws a validation error if a required attribute is not present', (done) => {
      request(app)
        .post('/api/shopping-cart/1')
        .set('Content-Type', 'application/json')
        .send(invalidCartInput)
        .end((err, res) => {
          const { success, errors } = res.body;

          expect(res.status).toEqual(422);
          expect(success).toEqual(false);
          expect(errors[0].msg).toEqual('CartId is missing');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#getCart', () => {
    it('retrieves items in cart', (done) => {
      request(app)
        .get('/api/shopping-cart/1q4btu7key2s28a')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { cart, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(cart.length).toEqual(1);
          expect(cart[0].quantity).toEqual(4);
          expect(cart[0].grocery.name).toEqual('Apple');
          expect(cart[0].grocery.finalPrice).toEqual(1800);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#updateQuantity', () => {
    it('updates item quantity in cart', (done) => {
      request(app)
        .put('/api/shopping-cart/1/1q4btu7key2s28a')
        .set('Content-Type', 'application/json')
        .send({ quantity: 6 })
        .end((err, res) => {
          const { cart, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(cart[0].grocery.finalPrice).toEqual(2700);
          if (err) return done(err);
          done();
        });
    });

    it('throws a 404 error when item is not found', (done) => {
      request(app)
        .put('/api/shopping-cart/2/1q4btu7key2s28a')
        .set('Content-Type', 'application/json')
        .send({ quantity: 6 })
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(404);
          expect(success).toEqual(false);
          expect(errors).toEqual('Cart item not found');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#removeCartItem', () => {
    it('removes an item from cart', (done) => {
      request(app)
        .delete('/api/shopping-cart/1/1q4btu7key2s28a')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { cart, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(cart.length).toEqual(0);
          if (err) return done(err);
          done();
        });
    });
  });
});
