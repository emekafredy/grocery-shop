import request from 'supertest';
import app from '../../../../app';

describe('Index api', () => {
  describe('/', () => {
    it('shows the root url', (done) => {
      request(app)
        .get('/')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res.status).toEqual(200);
          expect(message).toEqual('GROCERY-SHOP');
          if (err) return done(err);
          done();
        });
    });

    it('shows V1 api welcome message', (done) => {
      request(app)
        .get('/api')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(message).toEqual('Welcome to the Grocery Shop online API');
          if (err) return done(err);
          done();
        });
    });

    it('should return 404 error for incorrect url', (done) => {
      request(app)
        .get('/api/92899300')
        .end((err, res) => {
          const { errors } = res.body;
          expect(res.status).toEqual(404);
          expect(errors).toEqual('Oops! This route does not exist');
          if (err) return done(err);
          done();
        });
    });
  });
});
