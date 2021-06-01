const { getData, saveAvatar, updateUser } = require('./user.controller')();
const User = require('../models/user.model');

jest.mock('../models/user.model');

describe('Given an userController', () => {
  describe('invoking a getData function', () => {
    test('should call res.json with an object as argument', async () => {
      User.findById.mockImplementationOnce(() => ({
        populate: jest.fn().mockImplementationOnce(() => ({})),
      }));

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
        user: {},
      };

      await getData(req, res);
      expect(res.json).toHaveBeenCalledWith({ user: {} });
    });
  });
  describe('invoking a getData function without req arguments', () => {
    test('should return a status code 404', async () => {
      User.findById.mockImplementationOnce(() => ({
        populate: jest.fn().mockImplementationOnce(() => ({})),
      }));

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
      };

      await getData(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('invoking a saveAvatar function without file to upload', () => {
    test('should return a status code 400', async () => {
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn().mockImplementationOnce(() => ({
          send: jest.fn(),
        })),
      };

      const req = {
        get: () => 'host',
        user: {
          _id: '',
        },
      };

      await saveAvatar(req, res);
      expect(res.status).toHaveBeenCalled();
    });
  });

  describe('invoking a saveAvatar function with a pdf file', () => {
    test('should return a status code 400', async () => {
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn().mockImplementationOnce(() => ({
          send: jest.fn(),
        })),
      };

      const req = {
        get: () => 'host',
        file: {
          originalname: 'file.pdf',
        },
        user: {
          _id: '',
        },
      };

      await saveAvatar(req, res);
      expect(res.status).toHaveBeenCalled();
    });
  });

  describe('invoking a saveAvatar function with a valid file', () => {
    test('should call res.json with an user', async () => {
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn().mockImplementationOnce(() => ({
          send: jest.fn(),
        })),
      };

      const req = {
        get: () => 'host',
        file: {
          originalname: 'file.jpg',
        },
        user: {
          _id: '',
        },
      };

      await saveAvatar(req, res);
      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe('invoking a saveAvatar and forcing an error', () => {
    test('should return a status code 400', async () => {
      User.findByIdAndUpdate.mockRejectedValueOnce(400);

      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn().mockImplementationOnce(() => ({
          send: jest.fn(),
        })),
      };

      const req = {
        get: () => 'host',
        file: {
          originalname: 'file.jpg',
        },
        user: {
          _id: '',
        },
      };

      await saveAvatar(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('invoking a updateUser function', () => {
    test('should call res.json with an object as argument', async () => {
      User.findById.mockImplementationOnce(() => ({
        populate: jest.fn().mockImplementationOnce(() => ({})),
      }));

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
        user: { _id: 1 },
        body: { user: {} },

      };

      await updateUser(req, res);
      expect(res.json).toHaveBeenCalledWith({ });
    });
  });

  describe('invoking a updateUser function without an id', () => {
    test('should call res.json with an object as argument', async () => {
      User.findOneAndUpdate.mockRejectedValueOnce(404);

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const req = {
        user: { _id: 1 },
        body: { user: {} },

      };

      await updateUser(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
