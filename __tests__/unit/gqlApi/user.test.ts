import { request } from 'graphql-request';
import {AppDataSource} from '../../../src/data-source'
import { createConnection, Connection } from 'typeorm';

const endpoint = 'http://localhost:6007/graphql';
let authToken:any = ""
let connection:Connection

//hook that runs before all test cases in this file
beforeAll(async()=> {
   connection= await createConnection(AppDataSource.options)
})


//hook that runs after all test cases in this file
afterAll(async()=> {
  await connection.query('DROP TABLE IF EXISTS user_plan');
  await connection.query('DROP TABLE IF EXISTS user');
  connection.close()
})


//all test cases
describe('Testing user graphql Api', ()=> {
    describe('Testing graphql mutations for user API', ()=>{
        describe('create user mutation', ()=>{
            const mutation = `
                 mutation{
                  createUser(name:"user10", username:"username10", email:"user10@gmail.com", password:"12345", role:0, active:true){
                    id
                    name
                    email
                  }
                }
              `;
              
            test('should user register if user does not exists and return registered user', async () => {
              const response:any= await request(endpoint, mutation);
              expect(response.createUser.id).toEqual("1");
              expect(response.createUser.name).toEqual('user10');
              expect(response.createUser.email).toEqual('user10@gmail.com');
            });
    
    
            test('should return null if user already exist ', async () => {
              const response:any= await request(endpoint, mutation);
              expect(response.createUser).toEqual(null);
            });
       })


       describe('signin user mutation', ()=>{
         test('should user login if user  exists and return access token', async () => {
               const mutation = `
                   mutation{
                    signinUser(email:"user10@gmail.com", password:"12345")
                  }
                `;
              authToken= await request(endpoint, mutation);
              expect(authToken.signinUser).not.toEqual("");
              expect(authToken.signinUser.length).toBeGreaterThan(166);
            });
    
    
            test('should return User Not Found if user does not exist ', async () => {
              const mutation = `
                   mutation{
                    signinUser(email:"user20@gmail.com", password:"12345")
                    
                  }
                `;
              const response:any= await request(endpoint, mutation);
              expect(response.signinUser).toEqual("User Not Found");
            });


            test('should return unauthorization if password is incorrect ', async () => {
               let mutation = `
                 mutation{
                  signinUser(email:"user10@gmail.com", password:"12345hsd8976")
                  
                }
              `;
              const response:any= await request(endpoint, mutation);
              expect(response.signinUser).toEqual("password or email is incorrect");
            });
       })
    })

    describe('Testing graphql queries for user', ()=>{
        describe('get single user', ()=>{
    
            const query = `
                query {
                  getUser(id: 1) {
                    id
                    name
                    username
                  }
                }
              `;
              
            test('should get a single user if user logged in', async () => {
              const headers = {
                  Authorization: `Bearer ${authToken.signinUser}`,
              };
    
              const response:any= await request(endpoint, query, {headers});
              expect(response.getUser.id).toEqual("1");
              expect(response.getUser.name).toEqual('user10');
              expect(response.getUser.username).toEqual('username10');
            });
    
    
            test('should get every fields null user if user not logged in', async () => {
              const response:any= await request(endpoint, query);
              expect(response.getUser).toEqual(null);
            });
       })
    })
})


