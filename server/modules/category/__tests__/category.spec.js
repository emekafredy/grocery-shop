import request from 'supertest';
import app from '../../../../app';
import models from '../../../database/models';

import { validVendorInput } from '../../user/__tests__/data/user';

describe('Category Controller Specs', () => {
  let token;

  beforeAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
    await models.Category.destroy({ force: true, truncate: { cascade: true } });
    const vendor = await request(app).post('/api/vendors/register').send(validVendorInput);
  
    // eslint-disable-next-line prefer-destructuring
    token = vendor.body.token;
  });

  afterAll(async () => {
    await models.User.destroy({ force: true, truncate: { cascade: true } });
    await models.Category.destroy({ force: true, truncate: { cascade: true } });
  });

  describe('#createCategory', () => {
    it('successfully creates a grocery category', (done) => {
      request(app)
        .post('/api/category/new')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({ name: 'Fruits' })
        .end((err, res) => {
          const { category, success } = res.body;

          expect(res.status).toEqual(201);
          expect(success).toEqual(true);
          expect(category.name).toEqual('Fruits');
          if (err) return done(err);
          done();
        });
    });

    it('throws a duplication error if category name already exists', (done) => {
      request(app)
        .post('/api/category/new')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({ name: 'Fruits' })
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(409);
          expect(success).toEqual(false);
          expect(errors).toEqual('You already have a similar category');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#allCategories', () => {
    it('fetches all categories', (done) => {
      request(app)
        .get('/api/categories')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          const { categories, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(categories[0].name).toEqual('Fruits');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#getCategory', () => {
    it('fetches a category by id', (done) => {
      request(app)
        .get('/api/category/1')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          const { category, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(category.name).toEqual('Fruits');
          if (err) return done(err);
          done();
        });
    });

    it('throws a 404 error if category does not exist', (done) => {
      request(app)
        .get('/api/category/2')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(404);
          expect(success).toEqual(false);
          expect(errors).toEqual('category does not exist');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('#updateCategory', () => {
    it('updates a category', (done) => {
      request(app)
        .put('/api/category/1')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({ name: 'Vegetables' })
        .end((err, res) => {
          const { category, success } = res.body;

          expect(res.status).toEqual(200);
          expect(success).toEqual(true);
          expect(category.name).toEqual('Vegetables');
          if (err) return done(err);
          done();
        });
    });

    it('throws a 404 error if category does not exist', (done) => {
      request(app)
        .put('/api/category/2')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({ name: 'Vegetables' })
        .end((err, res) => {
          const { errors, success } = res.body;

          expect(res.status).toEqual(404);
          expect(success).toEqual(false);
          expect(errors).toEqual('category does not exist');
          if (err) return done(err);
          done();
        });
    });
  });
});
