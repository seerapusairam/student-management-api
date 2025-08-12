const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const model = require('../model/studentSchema');
const { getStudents } = require('../controller/studentController');

describe('getStudents', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return filtered and paginated students', async () => {
    const fakeStudent = [
      {
        _id: 'student1',
        name: 'sai',
        grade: 'A',
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'student2',
        name: 'suku',
        grade: 'A',
        createdBy: 'user2',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const limitStub = sinon.stub().returns(Promise.resolve(fakeStudent));
    const skipStub = sinon.stub().returns({ limit: limitStub });
    const sortStub = sinon.stub().returns({ skip: skipStub });
    const findStub = sinon.stub(model, 'find').returns({ sort: sortStub });

    const req = {
      user: { userId: 'user1' },
      query: { grade: 'A', sort: 'name', limit: '10', page: '1' },
    };

    const res = {
      json: sinon.spy(),
    };

    await getStudents(req, res);

    expect(findStub.calledOnceWith({ grade: 'A', createdBy: 'user1' })).to.be.true;
    expect(sortStub.calledOnceWith('name')).to.be.true;
    expect(skipStub.calledOnceWith(0)).to.be.true;
    expect(limitStub.calledOnceWith(10)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal({
      task: fakeStudent,
      count: fakeStudent.length,
    });
  });

  it('should return students without any filters', async () => {
    const fakeStudent = [
      {
        _id: 'student1',
        name: 'sai',
        grade: 'A',
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'student2',
        name: 'suku',
        grade: 'A',
        createdBy: 'user2',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

  const query = {
    sort: sinon.stub().returnsThis(),
    skip: sinon.stub().returnsThis(),
    limit: sinon.stub().resolves(fakeStudent),
  };

  // Stub model.find() to return this query object
  const findStub = sinon.stub(model, 'find').returns(query);

    const req = {
      user: { userId: 'user1' },
      query: {},
    };

    const res = {
      json: sinon.spy(),
    };

    await getStudents(req, res);

    expect(findStub.calledOnceWith({createdBy: 'user1' })).to.be.true;
    expect(query.sort.calledOnceWith(undefined)).to.be.false;
    expect(query.skip.calledOnceWith(0)).to.be.true;
    expect(query.limit.calledOnceWith(10)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal({
      task: fakeStudent,
      count: fakeStudent.length,
    });
  });
});