import chai from 'chai';
import { before } from 'mocha';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
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
