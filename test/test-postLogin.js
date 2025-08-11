const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const { postLogin } = require('../controller/userController');
const { badRequestError, unauthenticatedError } = require('../Error/allErrors');
const model = require('../Model/userSchema');

describe('postLogin', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should throw badRequestError if email or password missing', async () => {
    const req = { body: { email: '', password: '' } };
    const res = {};

    try {
      await postLogin(req, res);
      throw new Error('Expected error not thrown');
    } catch (err) {
      expect(err).to.be.instanceOf(badRequestError);
      expect(err.message).to.equal('Please provide the data in body param');
    }
  });

  it('should throw unauthenticatedError if email is not found', async () => {
    const req = { body: { email: 'test@gmail.com', password: 'password' } };
    const res = {};

    sinon.stub(model, 'findOne').resolves(null)

    try {
      await postLogin(req, res);
      throw new Error('Expected error not thrown');
    } catch (err) {
      expect(model.findOne.calledOnceWith({email: 'test@gmail.com'})).to.be.true;
      expect(err).to.be.instanceOf(unauthenticatedError);
      expect(err.message).to.equal('Invalid Credentials');
    }
  });

  it('should throw unauthenticatedError if password is wrong', async () => {
    const req = { body: { email: 'test@gmail.com', password: 'wrongpassword' } };
    const res = {};

    const fakeUser = {
        checkPassword: sinon.stub().resolves(false) // this one is returning false from checkPassword function
    }

    sinon.stub(model, 'findOne').resolves(fakeUser)

    try {
      await postLogin(req, res);
      throw new Error('Expected error not thrown');
    } catch (err) {
      expect(model.findOne.calledOnceWith({email: 'test@gmail.com'})).to.be.true;
      expect(fakeUser.checkPassword.calledOnceWith('wrongpass')).to.be.false;
      expect(err).to.be.instanceOf(unauthenticatedError);
      expect(err.message).to.equal('Invalid Credentials');
    }
  });
  
  it('should return user and JWT Token successsfully', async () => {
    const req = { body: { email: 'test@gmail.com', password: 'correctpassword' } };

    const fakeUser = {
        name: 'Test user',
        checkPassword: sinon.stub().resolves(true),
        createJWT: sinon.stub().resolves('jwt-token') // this one is returning jwt token
    }

    sinon.stub(model, 'findOne').resolves(fakeUser)

    const res = {
        status: sinon.stub().returnsThis(), // to mock the status code res.status(200)
        json: sinon.stub() // to mock the json body .json({message:"mock"})
    };

    await postLogin(req, res);

    expect(model.findOne.calledOnceWith({email: 'test@gmail.com'})).to.be.true;
    expect(fakeUser.checkPassword.calledOnceWith('correctpassword')).to.be.true;
    expect(fakeUser.createJWT.calledOnce).to.be.true;
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.json.calledOnceWith({
        user:{
            user:"Test user"
        },
        token:"jwt-token"
    })).to.be.true
  });
})