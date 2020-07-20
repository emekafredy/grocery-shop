import request from 'supertest';
import app from '../../../../app';

describe('Users', () => {
  describe('#getUsers', () => {
    it('should successfully fetch users', (done) => {
      request(app)
        .get('/api/users')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          const { success, message } = res.body;
          expect(success).toEqual(true);
          expect(message).toEqual('Users retrieved');
          if (err) return done(err);
          done();
        });
    });
  });
});
