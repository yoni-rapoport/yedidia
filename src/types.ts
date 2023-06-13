import "remult"
declare module "remult" {
  export interface UserInfo {
    departmentId: string
  }
  export interface RemultContext {
    origin: string
    signingIn: boolean
  }
}
