const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const app = require("../app"); 
const model = require("../model/studentSchema");
const { postStudents } = require("../controller/studentController");

describe('postStudents', () => {
  afterEach(() => {
    sinon.restore();
  });

it('should return user which are created', async () => {
    const req = {
         body: { name:"sai", grade:"A" },
         user: {userId: 'user123'}
        };

    const fakeStudent = {
        _id: "student123",
        name: "sai",
        grade: "A",
        createdBy: "user123",
        createdAt: new Date(),
        updatedAt: new Date()
      };

    sinon.stub(model, 'create').resolves(fakeStudent)

    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub() 
    };

    await postStudents(req, res);

    expect(model.create.calledOnceWith({
        name: "sai",
        grade: "A",
        createdBy: "user123"
    }
    )).to.be.true;
    expect(res.json.calledOnceWith(fakeStudent)).to.be.true;
  });

})