import {CREATE_USER, LOGIN_USER} from '../../../src/graphql/Mutations/User'
import { userServices } from '../../../src/services/userServices';
import { userUtils } from '../../../src/utils/userUtils';

jest.mock('../../../src/services/userServices');
jest.mock('../../../src/utils/userUtils')

const mockedUserServices = userServices as any;
const mockUserUtils = userUtils as any

afterAll(()=>{
    jest.unmock('../../../src/services/userServices')
})

describe('User Mutation Resolver', ()=> {
  describe('CREATE_USER Resolver', () => {
    const mockUser = { id: 1, name: 'John Doe', username:'john_doe', email:"john@gmail.com",password:'12345'};

    afterEach(() => {
      jest.clearAllMocks();
    });


    it('should return user created succesfully on successfull registration', async () => {
      mockedUserServices.registerUser.mockResolvedValue(mockUser);
      mockedUserServices.getUserByEmail.mockResolvedValue(false);
      const result = await CREATE_USER.resolve(null, mockUser as any);
      expect(result).toEqual(mockUser);
    });
  
  
    it('should return user already exist if user registered before', async () => {
      mockedUserServices.getUserByEmail.mockResolvedValue(true);
      const result = await CREATE_USER.resolve(null, mockUser as any);
      expect(result).toEqual(null);
    });

  });

  describe('LOGIN_USER Resolver', () => {
    const mockUser = {email:"john@gmail.com",password:'12345'};
    const mockAccessToken = "access_token";
    afterEach(() => {
      jest.clearAllMocks();
    });

    
    it('should return access token if user register', async () => {
      mockedUserServices.getUserByEmail.mockResolvedValue(mockUser);
      mockUserUtils.verifyPassword.mockResolvedValue(true);
      mockUserUtils.genrateToken.mockResolvedValue(mockAccessToken);
      const result = await LOGIN_USER.resolve(null, mockUser as any);
      console.log(result)
      expect(result).toEqual(mockAccessToken);
      expect(result).not.toBeNull();
      expect(result).not.toEqual("")
    });
  
  
    it('should return user not found if user not register', async () => {
      mockedUserServices.getUserByEmail.mockResolvedValue(false);
      const result = await LOGIN_USER.resolve(null, mockUser as any);
      console.log(result)
      expect(result).toEqual("User Not Found");
    });
    

     it('should return password is incorrect', async () => {
      mockedUserServices.getUserByEmail.mockResolvedValue(true);
      mockUserUtils.verifyPassword.mockResolvedValue(false);
      const result = await LOGIN_USER.resolve(null, mockUser as any);
      console.log(result)
      expect(result).toEqual("password or email is incorrect");
    });

  });
})

