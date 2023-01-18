import chai from 'chai';
import { before } from 'mocha';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';

import { app } from '../app';
import { repositoryUser, repositoryAccount } from '../middlewares/transactionValidate';
import { service } from '../routes/transaction.routes';

const userMock = {
  id: 'test',
  username: 'user',
  password: 'Password123',
  accountId: 'account',
  account: { id: 'account', balance: 100.00 }
};

const transactionMock = {
  id: 'test',
  debitedAccountId: 'debited',
  creditedAccountId: 'credited',
  value: 25.00,
  createdAt: new Date('2012-12-12'),
  debitedAccount: { id: 'test', username: 'user', password: 'Password123', accountId: 'account', balance: 100.00 },
  creditedAccount:  { id: 'test', username: 'user', password: 'Password123', accountId: 'account', balance: 100.00 },
};

chai.use(chaiHttp);

const { expect } = chai;

describe('Model Transaction', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.username, id: userMock.id });
    sinon.stub(repositoryUser, 'find').resolves([userMock]);
    sinon.stub(repositoryAccount, 'find').resolves([userMock.account]);
    sinon.stub(service.repositoryTransaction, 'create').returns(transactionMock);
    sinon.stub(service.repositoryAccount, 'save').resolves();
    sinon.stub(service.repositoryTransaction, 'save').resolves();
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (repositoryUser.find as sinon.SinonStub).restore();
    (repositoryAccount.find as sinon.SinonStub).restore();
    (service.repositoryTransaction.create as sinon.SinonStub).restore();
    (service.repositoryAccount.save as sinon.SinonStub).restore();
    (service.repositoryTransaction.save as sinon.SinonStub).restore();
  });

  it('metodo post /transaction', async () => {
    const response = await chai.request(app).post('/transaction').set('authorization', 'token')
      .send({ creditedUserUsername: userMock.username, value: transactionMock.value });
    expect(response.status).to.be.equal(201);
  });
});

describe('Model Transaction', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.username, id: userMock.id });
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('metodo post /transaction sem informar usuário', async () => {
    const response = await chai.request(app).post('/transaction').set('authorization', 'token')
      .send({ value: transactionMock.value });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Required creditedAccountId and value');
  });

  it('metodo post /transaction sem informar valor', async () => {
    const response = await chai.request(app).post('/transaction').set('authorization', 'token')
      .send({ creditedUserUsername: userMock.username });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Required creditedAccountId and value');
  });
});

describe('Model Transaction', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.username, id: userMock.id });
    sinon.stub(repositoryUser, 'find').resolves([]);
    sinon.stub(repositoryAccount, 'find').resolves([userMock.account]);
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (repositoryUser.find as sinon.SinonStub).restore();
    (repositoryAccount.find as sinon.SinonStub).restore();
  });

  it('metodo post /transaction com usuário inválido', async () => {
    const response = await chai.request(app).post('/transaction').set('authorization', 'token')
      .send({ creditedUserUsername: userMock.username, value: transactionMock.value });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid transaction');
  });
});

describe('Model Transaction', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.username, id: userMock.id });
    sinon.stub(repositoryUser, 'find').resolves([userMock]);
    sinon.stub(repositoryAccount, 'find').resolves([userMock.account]);
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (repositoryUser.find as sinon.SinonStub).restore();
    (repositoryAccount.find as sinon.SinonStub).restore();
  });

  it('metodo post /transaction com valor inválido', async () => {
    const response = await chai.request(app).post('/transaction').set('authorization', 'token')
      .send({ creditedUserUsername: userMock.username, value: 1000.00 });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Transaction value bigger than balance');
  });
});

describe('Model Transaction', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.username, id: userMock.id });
    sinon.stub(service.repositoryUser, 'find').resolves([userMock]);
    sinon.stub(service.repositoryTransaction, 'find').resolves([transactionMock]);
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (service.repositoryUser.find as sinon.SinonStub).restore();
    (service.repositoryTransaction.find as sinon.SinonStub).restore();
  });

  it('metodo get /transaction/cashout', async () => {
    const response = await chai.request(app).get('/transaction/cashout').set('authorization', 'token');
    expect(response.status).to.be.equal(200);
    expect(response.body[0].id).to.be.equal(transactionMock.id);
    expect(response.body[0].debitedAccountId).to.be.equal(transactionMock.debitedAccountId);
    expect(response.body[0].creditedAccountId).to.be.equal(transactionMock.creditedAccountId);
    expect(response.body[0].value).to.be.equal(transactionMock.value);
  });
});

describe('Model Transaction', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.username, id: userMock.id });
    sinon.stub(service.repositoryUser, 'find').resolves([userMock]);
    sinon.stub(service.repositoryTransaction, 'find').resolves([transactionMock]);
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (service.repositoryUser.find as sinon.SinonStub).restore();
    (service.repositoryTransaction.find as sinon.SinonStub).restore();
  });

  it('metodo get /transaction/cashin', async () => {
    const response = await chai.request(app).get('/transaction/cashin').set('authorization', 'token');
    expect(response.status).to.be.equal(200);
    expect(response.body[0].id).to.be.equal(transactionMock.id);
    expect(response.body[0].debitedAccountId).to.be.equal(transactionMock.debitedAccountId);
    expect(response.body[0].creditedAccountId).to.be.equal(transactionMock.creditedAccountId);
    expect(response.body[0].value).to.be.equal(transactionMock.value);
  });
});

describe('Model Transaction', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.username, id: userMock.id });
    sinon.stub(service.repositoryUser, 'find').resolves([userMock]);
    sinon.stub(service.repositoryTransaction, 'find').resolves([transactionMock]);
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (service.repositoryUser.find as sinon.SinonStub).restore();
    (service.repositoryTransaction.find as sinon.SinonStub).restore();
  });

  it('metodo get /transaction', async () => {
    const response = await chai.request(app).get('/transaction').set('authorization', 'token');
    expect(response.status).to.be.equal(200);
    expect(response.body[0].id).to.be.equal(transactionMock.id);
    expect(response.body[0].debitedAccountId).to.be.equal(transactionMock.debitedAccountId);
    expect(response.body[0].creditedAccountId).to.be.equal(transactionMock.creditedAccountId);
    expect(response.body[0].value).to.be.equal(transactionMock.value);
  });
});

describe('Model Transaction', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves({ username: userMock.username, id: userMock.id });
    sinon.stub(service.repositoryUser, 'find').resolves([userMock]);
    const newTransaction = {
      id: 'test',
      debitedAccountId: 'debited',
      creditedAccountId: 'credited',
      value: 25.00,
      createdAt: new Date('2012-12-11'),
      debitedAccount: { id: 'test', username: 'user', password: 'Password123', accountId: 'account', balance: 100.00 },
      creditedAccount:  { id: 'test', username: 'user', password: 'Password123', accountId: 'account', balance: 100.00 },
    };
    sinon.stub(service.repositoryTransaction, 'find').onFirstCall().resolves([newTransaction]).onSecondCall().resolves([transactionMock]);
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (service.repositoryUser.find as sinon.SinonStub).restore();
    (service.repositoryTransaction.find as sinon.SinonStub).restore();
  });

  it('metodo post /transaction/date', async () => {
    const response = await chai.request(app).post('/transaction/date').set('authorization', 'token')
      .send({ dateString: '2012-12-12' });
    expect(response.status).to.be.equal(200);
    expect(response.body.length).to.be.equal(1);
    expect(response.body[0].id).to.be.equal(transactionMock.id);
    expect(response.body[0].debitedAccountId).to.be.equal(transactionMock.debitedAccountId);
    expect(response.body[0].creditedAccountId).to.be.equal(transactionMock.creditedAccountId);
    expect(response.body[0].value).to.be.equal(transactionMock.value);
  });
});
