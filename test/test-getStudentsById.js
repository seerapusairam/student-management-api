const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const model = require("../model/studentSchema");
const { getStudentById } = require("../controller/studentController");
const { notFoundError } = require("../error/allErrors");

describe("getStudentById", () => {
    let req, res;

    beforeEach(() => {
      req = {
        user: { userId: "user123" },
        params: { id: "student123" }
      };
      res = {
        json: sinon.spy()
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return student data when found", async () => {
      const fakeStudent = {
        _id: "student123",
        name: "sai",
        grade: "A",
        createdBy: "user123",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      sinon.stub(model, "findOne").resolves(fakeStudent);

      await getStudentById(req, res);

      expect(model.findOne.calledOnce).to.be.true;
      expect(res.json.calledWith(fakeStudent)).to.be.true;
    });

  it("should throw notFoundError when student not found", async () => {
    sinon.stub(model, "findOne").resolves(null);

    try {
      await getStudentById(req, res);
      throw new Error("Expected error but none thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(notFoundError);
      expect(err.message).to.equal("Provided data was not there");
    }
  });
})