import { Allow, Entity, Fields, getEntityRef, isBackend, remult } from "remult"
import { Roles } from "./roles"
import cuid from "cuid"

@Entity<Department>("departments", {
  allowApiCrud: Roles.admin,
  allowApiRead: Allow.authenticated,
  apiPrefilter: () => {
    if (remult.isAllowed(Roles.admin)) {
      return {}
    } else return { id: [remult.user?.departmentId!] }
  },
  saving: (d) => {
    if (isBackend() && getEntityRef(d).isNew() && !d.url) d.url = cuid()
  },
})
export class Department {
  @Fields.cuid()
  id = ""
  @Fields.string()
  name = ""
  @Fields.string()
  url = ""
  static getSignInUrl(p: Department) {
    return remult.context.origin + "/departmentSignIn/" + p.url
  }
}
