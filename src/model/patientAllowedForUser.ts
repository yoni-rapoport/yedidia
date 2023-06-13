import { EntityFilter, remult } from "remult";
import { Roles } from "./roles";
import { Patient } from "./patient";


export async function patientAllowedForUser(): Promise<
  EntityFilter<{ patientId: string; }>
> {
  if (remult.isAllowed(Roles.admin))
    return {};
  else if (remult.isAllowed(Roles.department))
    return {
      patientId: (
        await remult
          .repo(Patient)
          .find({ where: { departmentId: remult.user!.departmentId } })
      ).map((x) => x.id),
    };

  else
    return {
      patientId: remult.user!.id,
    };
}
