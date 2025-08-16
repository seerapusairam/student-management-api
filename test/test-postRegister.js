const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const { postRegister } = require('../controller/userController');
const { badRequestError, unauthenticatedError } = require('../errors/allErrors');

const model = require('../model/userSchema');

describe('postRegister', () => {
  afterEach(() => {
    sinon.restore();
  });

it('should return user and JWT Token successsfully', async () => {
    const req = { body: { name:"Test user", email: 'test@gmail.com', password: 'correctpassword' } };

    const fakeUser = {
        name: 'Test user',
        createJWT: sinon.stub().resolves('jwt-token') // this one is returning jwt token
    }

    sinon.stub(model, 'create').resolves(fakeUser)

    const res = {
        status: sinon.stub().returnsThis(), // to mock the status code res.status(200)
        json: sinon.stub() // to mock the json body .json({message:"mock"})
    };

    await postRegister(req, res);

    expect(model.create.calledOnceWith({...req.body})).to.be.true;
    expect(fakeUser.createJWT.calledOnce).to.be.true;
    expect(res.status.calledOnceWith(201)).to.be.true;
    expect(res.json.calledOnceWith({
        user:{
            user: fakeUser.name
        },
        token:"jwt-token"
    })).to.be.true
  });

})