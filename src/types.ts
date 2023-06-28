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

export enum ComponentToRender {
  TEXT = "TEXT",
  PICTURE = "PICTURE",
  PATIENT_NAME = "PATIENT_NAME",
}
