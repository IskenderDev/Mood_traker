import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);

let token;

describe('testing user authentication', () => {
  it('gET /login', (done) => {
    chai.request(app)
      .post('/login')
      .send({ email: 'testing@gmail.com', password: 'testing12' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token').that.is.a('string');
        token = res.body.token;
        done();
      });
  });

  it('gET /login with wrong details', (done) => {
    chai.request(app)
      .post('/login')
      .send({ email: 'tesng@gmail.com', password: 'teing12' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error').that.equal('Incorrect email or password');
        done();
      });
  });
});

describe('testing /user route', () => {
  it('gET /user should return user details', (done) => {
    chai.request(app)
      .get('/user')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('fullName').that.is.a('string');
        expect(res.body).to.have.property('email').that.is.a('string');
        done();
      });
  });
});
