const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const model = require("../model/studentSchema");
const { updateStudentById } = require("../controller/studentController");
const { notFoundError } = require("../errors/allErrors");

describe("updateStudentById", () => {
    let req, res;

    beforeEach(() => {
      req = {
        user: { userId: "user123" },
        body:{name:"sai",grade:"A"},
        params: { id: "student123" }
      };
      res = {
        json: sinon.spy()
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return updated student data", async () => {
      const fakeStudent = {
        _id: "student123",
        name: "sai",
        grade: "A",
        createdBy: "user123",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      sinon.stub(model, "findOneAndUpdate").resolves(fakeStudent);

      await updateStudentById(req, res);

      expect(model.findOneAndUpdate.calledOnce).to.be.true;
      expect(res.json.calledWith(fakeStudent)).to.be.true;
    });

  it("should throw notFoundError when student not found", async () => {
    sinon.stub(model, "findOneAndUpdate").resolves(null);

    try {
      await updateStudentById(req, res);
      throw new Error("Expected error but none thrown");// if the function throw error then no need to add this line is a safety net
    } catch (err) {
      expect(err).to.be.instanceOf(notFoundError);
      expect(err.message).to.equal("Student not found");
    }
  });
})