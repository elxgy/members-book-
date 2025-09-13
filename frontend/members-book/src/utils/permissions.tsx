import { UserType, MemberHierarchy } from "../types"

export const Permissions = {
  // Admin permissions
  MANAGE_MEMBERS: ["admin"] as UserType[],
  DELETE_MEMBERS: ["admin"] as UserType[],
  EDIT_ANY_PROFILE: ["admin"] as UserType[],

  // Member permissions
  SEND_MESSAGES: ["admin", "member"] as UserType[],
  VIEW_CONTACT_INFO: ["admin", "member"] as UserType[],
  EDIT_OWN_PROFILE: ["admin", "member"] as UserType[],

  // Guest permissions (read-only)
  VIEW_PROFILES: ["admin", "member", "guest"] as UserType[],
  VIEW_SECTORS: ["admin", "member", "guest"] as UserType[],
}

export const HierarchyLevels = {
  socios: 3,
  infinity: 2,
  disruption: 1,
} as const

export function hasPermission(userType: UserType | undefined, permission: UserType[]): boolean {
  return userType ? permission.includes(userType) : false
}

export function canContactMember(
  userType: UserType | undefined,
  userHierarchy: MemberHierarchy | undefined,
  targetHierarchy: MemberHierarchy,
): boolean {
  // Guests can't contact anyone
  if (userType === "guest") return false

  // Admins can contact anyone
  if (userType === "admin") return true

  // Members can contact members of same or lower hierarchy
  if (userType === "member" && userHierarchy) {
    return HierarchyLevels[userHierarchy] >= HierarchyLevels[targetHierarchy]
  }

  return false
}

export function getHierarchyDisplayName(hierarchy: MemberHierarchy): string {
  switch (hierarchy) {
    case "socios":
      return "Sócios"
    case "infinity":
      return "Infinity"
    case "disruption":
      return "Disruption"
    default:
      return "Membro"
  }
}

export function getUserTypeDisplayName(userType: UserType): string {
  switch (userType) {
    case "admin":
      return "Administrador"
    case "member":
      return "Membro"
    case "guest":
      return "Convidado"
    default:
      return "Usuário"
  }
}
