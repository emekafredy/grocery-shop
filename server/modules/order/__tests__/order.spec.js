import request from 'supertest';
import app from '../../../../app';
import models from '../../../database/models';
import { clearTables, generateTestToken } from '../../../helpers/specHelper';

import { orderData } from './data/order';
import { groceriesData, categoriesData } from '../../grocery/__tests__/data/grocery';
import { userData } from '../../user/__tests__/data/user';

describe('Cart Controller Specs', () => {
  let userToken; let userTokenII;
  beforeAll(async () => {
    await clearTables();

    await models.Category.bulkCreate(categoriesData);
    await models.Grocery.bulkCreate(groceriesData);
    await models.User.bulkCreate(userData);
    await models.Order.bulkCreate(orderData);

    userToken = await generateTestToken('j.smith@mail.com');
    userTokenII = await generateTestToken('j.doe@mail.com');
  });

  afterAll(async () => {
    await clearTables();
  });

  describe('#getOrders', () => {
    it('gets user\'s orders', (done) => {
      request(app)
        .get('/api/orders')
        .set('Content-Type', 'application/json')
        .set('authorization', userToken)
        .end((err, res) => {
          const { success, order, message } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(message).toEqual('orders succesfully retrieved');
          expect(order.length).toEqual(2);
          expect(order[0].totalCost).toEqual(1200);
          if (err) return done(err);
          done();
        });
    });

    it('returns a message for user without orders', (done) => {
      request(app)
        .get('/api/orders')
        .set('Content-Type', 'application/json')
        .set('authorization', userTokenII)
        .end((err, res) => {
          const { success, message } = res.body;
        
          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(message).toEqual('No order found');
          if (err) return done(err);
          done();
        });
    });
  });
});
