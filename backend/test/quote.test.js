import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);

let token;
let quoteId;

describe(' user authentication', () => {
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
});

describe(' Testing Quote Route', () => {
    it('POST /quote', (done) => {
      chai.request(app)
        .post('/quote')
        .set('Authorization', token)
        .send({ icon: 'testing', color: '#234efw' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('error').that.equal('Missing Quote');
          done();
        });
    });

    it('POST /quote', (done) => {
        chai.request(app)
          .post('/quote')
          .set('Authorization', token)
          .send({ quote: 'Testing 123', icon: 'testing', color: '#234efw' })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('id').that.is.a('string');
            expect(res.body).to.have.property('message').that.equal('Quote Created Successfully');
            quoteId = res.body.id;
            done();
          });
      });

    it('GET /quotes', (done) => {
        chai.request(app)
          .get('/quotes')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('quote').that.is.a('array');
            done();
          });
    });

    it('DELETE a /quote by id', (done) => {
        chai.request(app)
          .delete(`/quote/${quoteId}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
    });

});

