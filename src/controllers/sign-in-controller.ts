import { Allow, BackendMethod, remult } from "remult"
import { setSessionUser } from "../server/server-session"
import { Roles } from "../model/roles"
import { Department } from "../model/department"
import { Patient } from "../model/patient"

export class SignInController {
  @BackendMethod({ allowed: true })
  static async patientSignIn(patientUrl: string) {
    remult.context.signingIn = true
    const patient = await remult.repo(Patient).findFirst({ url: patientUrl })
    if (!patient) {
      throw "מטופל לא מוכר"
    }
    return setSessionUser({
      id: patient.id,
      name: patient.name,
      roles: [],
      departmentId: patient.departmentId,
    })
  }
  @BackendMethod({ allowed: true })
  static async adminSignIn(user: string) {
    if (user === "ידידיה" || user === "נועם")
      return setSessionUser({
        id: user,
        name: user,
        roles: [Roles.admin, Roles.department],
        departmentId: undefined!,
      })
    else throw "משתמש לא קיים"
  }

  @BackendMethod({ allowed: Allow.authenticated })
  static async signOut() {
    setSessionUser(undefined!)
  }
  @BackendMethod({ allowed: true })
  static async departmentSignIn(departmentUrl: string) {
    const department = await remult
      .repo(Department)
      .findFirst({ url: departmentUrl })
    if (!department) {
      throw "מחלקה לא מוכרת"
    }
    return {
      user: setSessionUser({
        id: department.id,
        name: department.name,
        roles: [Roles.department],
        departmentId: department.id,
      }),
      department,
    }
  }

  @BackendMethod({ allowed: true })
  static async currentUser() {
    return remult.user
  }
}

declare module "remult" {
  export interface UserInfo {
    departmentId: string
  }
}
