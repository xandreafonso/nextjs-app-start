import { createAccessControl } from "better-auth/plugins/access"
import { defaultStatements, userAc, adminAc } from "better-auth/plugins/admin/access"

const statement = { 
    workspace: ["create", "read", "update", "delete"], 
} as const; 

export const ac = createAccessControl({ ... defaultStatements, ... statement })

export const user = ac.newRole(userAc.statements)

export const admin = ac.newRole(adminAc.statements)