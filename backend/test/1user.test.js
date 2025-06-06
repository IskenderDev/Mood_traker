import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import dbClient from '../utils/db';


chai.use(chaiHttp);


describe('testing the POST /signup Routes', () => {
  before(async function () {
    this.timeout(30000);
  });


  it('pOST /signup without fullName', (done) => {
    chai.request(app)
      .post('/signup')
      .send({ email: 'testing@gmail.com', password: 'testing12' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').that.equal('Missing fullname');
        done();
      });
  });

  it('pOST /signup without password', (done) => {
    chai.request(app)
      .post('/signup')
      .send({ fullName: 'john doe', email: 'testing2@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').that.equal('Missing Password');
        done();
      });
  });

  it('pOST /signup', (done) => {
    chai.request(app)
      .post('/signup')
      .send({ fullName: 'john doe', email: 'testing@gmail.com', password: 'testing12' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('fullName').that.equal('Bamiwo Adebayo');
        expect(res.body).to.have.property('email').that.equal('banwyyy@gmail.com');
        expect(res.body).to.have.property('id').that.is.a('string');
        done();
      });
  });

  it('pOST /signup with thesame params', (done) => {
    chai.request(app)
      .post('/signup')
      .send({ fullName: 'john doe', email: 'testing@gmail.com', password: 'testing12' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').that.equal('User Already Exist');
        done();
      });
  });
});