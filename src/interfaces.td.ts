

export interface jsonPayload{
      username?:string
      email:string,
      password:string
}

export interface Permissions{
      isLoggedIn:boolean,
      role:number | undefined
}