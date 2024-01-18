import { GET_SINGLE_USER , GET_ALL_USER} from '../../../src/graphql/Queries/User';
import { userServices } from '../../../src/services/userServices';

jest.mock('../../../src/services/userServices');

const mockedUserServices = userServices as any;

afterAll(()=>{
    jest.unmock('../../../src/services/userServices')
})


describe('User Queries Resolver', ()=> {

  describe('GET_SINGLE_USER Resolver', () => {
  
    it('should return a single user for a valid ID if the user is logged in', async () => {
      const mockContext = {
        isLoggedIn: true,
        role: 0,
      };
      const mockUser = { id: 1, name: 'John Doe', username:'john_doe', email:"john@gmail.com" };
      mockedUserServices.getUserById.mockResolvedValue(mockUser);
      const result = await GET_SINGLE_USER.resolve(null, { id: 1 }, mockContext);
      expect(result).toEqual(mockUser);
    });
  
  
    it('should return an empty object if the user is not logged in', async () => {
      const mockContext = {
        isLoggedIn: false,
        role: 1,
      };
      const result = await GET_SINGLE_USER.resolve(null, { id: 1 }, mockContext);
      expect(result).toEqual(null);
    });
  });


  describe('GET_ALL_USER Resolver', () => {
  
    it('should return a all user, if the user is logged in and admin', async () => {
      const mockContext = {
        isLoggedIn: true,
        role: 1,
      };
      const mockUsers = [
        { id: 1, name: 'John Doe', username:'john_doe', email:"john@gmail.com" },
        { id: 2, name: 'william headew', username:'william_headew', email:"william@gmail.com" },
        { id: 1, name: 'Sophie taylor', username:'sophie_tailer', email:"sophie@gmail.com" },
      ];
      mockedUserServices.getUsers.mockResolvedValue(mockUsers);
      const result = await GET_ALL_USER.resolve(null, {}, mockContext);
      expect(result).toEqual(mockUsers);
    });
  
  
    it('should return an empty array of object if the user is logged in but not admin', async () => {
      const mockContext = {
        isLoggedIn: true,
        role: 0,
      };
      const result = await GET_ALL_USER.resolve(null, {}, mockContext);
      expect(result).toEqual(null);
    });

    it('should return an empty array of object if the user is admin but not logged in', async () => {
      const mockContext = {
        isLoggedIn:false,
        role: 1,
      };
      const result = await GET_ALL_USER.resolve(null, {}, mockContext);
      expect(result).toEqual(null);
    });
  });
})

