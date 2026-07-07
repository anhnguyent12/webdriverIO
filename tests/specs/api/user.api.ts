import userBuilder from 'builders/user';
import userService from 'services/user';
import { errorSchema } from 'schemas/error';
import { ErrorResponse } from 'models/error';
import { HTTP_STATUS_CODES } from 'constants/httpCodes';
import { SchemaValidator } from 'validators/schemaValidator';
import { userAPIError } from 'constants/messages/error/index';
import { UserAPISuccess } from 'constants/messages/success/index';
import { deleteUserSchema, generateTokenSchema, userSchema } from 'schemas/user';
import { DeleteUserResponse, GenerateTokenResponse, UserResponse } from 'models/user';

let [userId, token]: string = '';
const newUser = {
  username: userBuilder.username + '123',
  password: userBuilder.password,
};

describe('User API Test @userApi', () => {
  it('Should return user information after creating a new user', async () => {
    const response = await userService.create(newUser.username, newUser.password);
    const data = response.data as UserResponse;
    expect(response.status).toEqual(HTTP_STATUS_CODES.CREATED);
    SchemaValidator.validate(userSchema, data);
    expect(data.username).toEqual(newUser.username);
    userId = data.userId;
  });

  it('Should authorize user', async () => {
    const response = await userService.authorized(newUser.username, newUser.password);
    expect(response.status).toEqual(HTTP_STATUS_CODES.OK);
    expect(response.data).toBe(true);
  });

  it('Should return user token', async () => {
    const response = await userService.generateToken(userBuilder.username, userBuilder.password);
    const data = response.data as GenerateTokenResponse;
    expect(response.status).toEqual(HTTP_STATUS_CODES.OK);
    SchemaValidator.validate(generateTokenSchema, data);
    expect(data.status).toEqual('Success');
    expect(data.result).toEqual(UserAPISuccess.GENERATE_TOKEN_SUCCESS);
    token = data.token;
  });

  it('Should return user information', async () => {
    const response = await userService.getInfo(userId, token);
    const data = response.data as UserResponse;
    expect(response.status).toEqual(HTTP_STATUS_CODES.OK);
    SchemaValidator.validate(userSchema, data);
    expect(data.username).toEqual(newUser.username);
  });

  it('Should delete a user successfully', async () => {
    const response = await userService.delete(userId, token);
    const data = response.data as DeleteUserResponse;
    expect(response.status).toEqual(HTTP_STATUS_CODES.OK);
    SchemaValidator.validate(deleteUserSchema, data);
    expect(data.message).toEqual(UserAPISuccess.DELETE_SUCCESS);
  });

  it('Should fail to create a user with missing credentials', async () => {
    const invalidUser = {
      username: userBuilder.username + '123',
      password: userBuilder.password + '123',
    };
    const response = await userService.generateToken(invalidUser.username, invalidUser.password);
    const data = response.data as GenerateTokenResponse;
    expect(response.status).toEqual(HTTP_STATUS_CODES.OK);
    SchemaValidator.validate(generateTokenSchema, data);
    expect(data.status).toEqual('Failed');
    expect(data.result).toEqual(userAPIError.GENERATE_TOKEN_FAIL);
  });

  it('Should fail to create a user with invalid credentials', async () => {
    const response = await userService.generateToken('', '');
    const data = response.data as ErrorResponse;
    expect(response.status).toEqual(HTTP_STATUS_CODES.BAD_REQUEST);
    SchemaValidator.validate(errorSchema, data);
    expect(data.message).toEqual(userAPIError.MISSING_CREDENTIAL);
  });

  it('Should fail to create an existing user', async () => {
    const response = await userService.create(userBuilder.username, userBuilder.password);
    const data = response.data as ErrorResponse;
    expect(response.status).toEqual(HTTP_STATUS_CODES.NOT_ACCEPTABLE);
    SchemaValidator.validate(errorSchema, data);
    expect(data.message).toEqual(userAPIError.USER_EXISTED);
  });

  it('Should fail to get user information with an invalid user ID', async () => {
    const response = await userService.getInfo(userId + '123', token);
    const data = response.data as ErrorResponse;
    expect(response.status).toEqual(HTTP_STATUS_CODES.UNAUTHORIZED);
    SchemaValidator.validate(errorSchema, data);
    expect(data.message).toEqual(userAPIError.USER_NOT_FOUND);
  });

  it('Should fail to delete a user with missing user token', async () => {
    const response = await userService.delete(userId, '');
    const data = response.data as ErrorResponse;
    expect(response.status).toEqual(HTTP_STATUS_CODES.UNAUTHORIZED);
    SchemaValidator.validate(errorSchema, data);
    expect(data.message).toEqual(userAPIError.USER_NOT_AUTHORIZED);
  });
});
