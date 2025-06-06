import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);

let token;
let journalId;

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

describe(' Testing the journal routes ', () => {
    it('should create a new journal', (done) => {
        chai.request(app)
            .post('/journal')
            .set('Authorization', token)
            .send({ title: 'Enjoy your life', content: 'This is Testing', date: '2024-06-26T23:00:00.000Z' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error').that.equal('Missing Mood');
                done();
            });
    });

    it('should create a new journal without mood', (done) => {
        chai.request(app)
            .post('/journal')
            .set('Authorization', token)
            .send({ mood: { icon: ":)", name: "Happy", value: 1 }, title: 'Enjoy your life', content: 'This is Testing', date: '2024-06-26T23:00:00.000Z' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message').that.equal('Journal Added Successfully');
                expect(res.body).to.have.property('id').that.is.a('string');
                journalId = res.body.id;
                done();
            });
    });

    it('should get all journals', (done) => {
        chai.request(app)
            .get('/journals')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('journals').that.is.a('array');
                done();
            });
    });

    it('should get journal by id', (done) => {
        chai.request(app)
            .get(`/journal/${journalId}`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('journal').that.is.a('object');
                done();
            });
    });

    it('should create a update journal by id', (done) => {
        chai.request(app)
            .put(`/journal/${journalId}`)
            .set('Authorization', token)
            .send({ mood: { icon: ":(", name: "Sad", value: 2 }, title: 'Enjoy your testing', content: 'This is Testing', date: '2024-06-26T23:00:00.000Z' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').that.is.a('string');
                done();
            });
    });

    it('should get all mood journals', (done) => {
        chai.request(app)
            .get('/moods')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should delete a journal by id', (done) => {
        chai.request(app)
            .delete(`/journal/${journalId}`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});