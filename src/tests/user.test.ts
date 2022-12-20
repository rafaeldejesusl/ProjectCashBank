import chai from 'chai';
import { before } from 'mocha';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import chaiHttp from 'chai-http';

import { app } from '../app';
import { repositoryUser } from '../middlewares/userValidate';
import { service } from '../routes/user.routes';

const userMock = {
  id: 'test',
  username: 'user',
  password: 'Password123',
  accountId: 'account',
  account: { id: 'account', balance: 100.00 }
};

chai.use(chaiHttp);

const { expect } = chai;

describe('Model User', () => {
  before(() => {
    sinon.stub(repositoryUser, 'find').resolves([]);
    sinon.stub(service.repositoryAccount, 'create').returns(userMock.account);
    sinon.stub(service.repositoryAccount, 'save').resolves();
    sinon.stub(service.repositoryUser, 'create').returns(userMock);
    sinon.stub(service.repositoryUser, 'save').resolves();
  });

  after(() => {
    (repositoryUser.find as sinon.SinonStub).restore();
    (service.repositoryAccount.create as sinon.SinonStub).restore();
    (service.repositoryAccount.save as sinon.SinonStub).restore();
    (service.repositoryUser.create as sinon.SinonStub).restore();
    (service.repositoryUser.save as sinon.SinonStub).restore();
  });

  it('metodo post /user', async () => {
    const response = await chai.request(app).post('/user')
      .send({ username: userMock.username, password: userMock.password });
    expect(response.status).to.be.equal(201);
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(repositoryUser, 'find').resolves([ userMock ]);
  });

  after(() => {
    (repositoryUser.find as sinon.SinonStub).restore();
  });

  it('metodo post /user quando já existir um usuário', async () => {
    const response = await chai.request(app).post('/user')
      .send({ username: userMock.username, password: userMock.password });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid username');
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(repositoryUser, 'find').resolves([]);
  });

  after(() => {
    (repositoryUser.find as sinon.SinonStub).restore();
  });

  it('metodo post /user quando o usuário não tiver tamanho suficiente', async () => {
    const response = await chai.request(app).post('/user')
      .send({ username: 'ze', password: userMock.password });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid username');
  });

  it('metodo post /user quando a senha for muito curta', async () => {
    const response = await chai.request(app).post('/user')
      .send({ username: userMock.username, password: 'Biz123' });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid password');
  });

  it('metodo post /user quando a senha não tiver números', async () => {
    const response = await chai.request(app).post('/user')
      .send({ username: userMock.username, password: 'Batatinha' });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid password');
  });

  it('metodo post /user quando a senha não tiver letras maiúsculas', async () => {
    const response = await chai.request(app).post('/user')
      .send({ username: userMock.username, password: 'batatinha123' });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid password');
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(service.repositoryUser, 'find').resolves([userMock]);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(jwt, 'sign').resolves('token');
  });

  after(() => {
    (service.repositoryUser.find as sinon.SinonStub).restore();
    (bcrypt.compareSync as sinon.SinonStub).restore();
    (jwt.sign as sinon.SinonStub).restore();
  });

  it('metodo post /login', async () => {
    const response = await chai.request(app).post('/login')
      .send({ username: userMock.username, password: userMock.password });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal('token');
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(service.repositoryUser, 'find').resolves([]);
    sinon.stub(bcrypt, 'compareSync').returns(true);
  });

  after(() => {
    (service.repositoryUser.find as sinon.SinonStub).restore();
    (bcrypt.compareSync as sinon.SinonStub).restore();
  });

  it('metodo post /login quando não existir o usuário', async () => {
    const response = await chai.request(app).post('/login')
      .send({ username: userMock.username, password: userMock.password });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid username or password');
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(service.repositoryUser, 'find').resolves([userMock]);
    sinon.stub(bcrypt, 'compareSync').returns(false);
  });

  after(() => {
    (service.repositoryUser.find as sinon.SinonStub).restore();
    (bcrypt.compareSync as sinon.SinonStub).restore();
  });

  it('metodo post /login quando a senha estiver incorreta', async () => {
    const response = await chai.request(app).post('/login')
      .send({ username: userMock.username, password: userMock.password });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid username or password');
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.username, id: userMock.id });
    sinon.stub(service.repositoryUser, 'find').resolves([userMock]);
    sinon.stub(service.repositoryAccount, 'find').resolves([userMock.account]);
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (service.repositoryUser.find as sinon.SinonStub).restore();
    (service.repositoryAccount.find as sinon.SinonStub).restore();
  });

  it('metodo get /user', async () => {
    const response = await chai.request(app).get('/user').set('authorization', 'token');
    expect(response.status).to.be.equal(200);
  });
});
