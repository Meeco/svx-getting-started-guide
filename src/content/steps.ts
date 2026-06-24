import {
  Building2,
  Users,
  Boxes,
  KeyRound,
  ShieldCheck,
  Settings2,
  FileJson2,
  FileBadge,
  BadgeCheck,
  ClipboardList,
  Inbox,
  ScanFace,
  type LucideIcon,
} from "lucide-react"

/**
 * The getting-started backbone. Every design renders these 12 steps in this
 * exact order. Each step carries i18n keys (resolved per locale) plus the
 * glossary term ids it references. Content/copy lives in src/locales/*.
 */

export type GroupId = "portal" | "wallet-setup" | "issue" | "verify" | "svx"

export interface StepGroup {
  id: GroupId
  /** i18n key prefix under `groups.<id>` */
  icon: LucideIcon
}

export interface Step {
  /** stable id, also the i18n key under `steps.<id>` */
  id: string
  /** route path relative to the app base */
  route: string
  group: GroupId
  /** 1-based position in the overall getting-started path */
  order: number
  icon: LucideIcon
  /** glossary term ids referenced on this page */
  terms: string[]
}

export const GROUPS: StepGroup[] = [
  { id: "portal", icon: Building2 },
  { id: "wallet-setup", icon: KeyRound },
  { id: "issue", icon: FileBadge },
  { id: "verify", icon: ClipboardList },
  { id: "svx", icon: ScanFace },
]

export const STEPS: Step[] = [
  // 1. Portal — do this first
  { id: "tenant", route: "/portal/tenant", group: "portal", order: 1, icon: Building2, terms: ["tenant", "portal", "tenant-admin"] },
  { id: "organisation", route: "/portal/organisation", group: "portal", order: 2, icon: Users, terms: ["organisation", "tenant", "wallet"] },
  { id: "applications", route: "/portal/applications", group: "portal", order: 3, icon: Boxes, terms: ["application", "deployment", "wallet", "wallet-url", "svx-verify"] },

  // 2. Wallet setup — stand up the wallet before using it
  { id: "api-keys", route: "/wallet/admin/api-keys", group: "wallet-setup", order: 4, icon: KeyRound, terms: ["api-key", "api", "wallet"] },
  { id: "admin-accounts", route: "/wallet/admin/accounts", group: "wallet-setup", order: 5, icon: ShieldCheck, terms: ["admin-account", "passkey", "wallet"] },
  { id: "wallet-settings", route: "/wallet/admin/settings", group: "wallet-setup", order: 6, icon: Settings2, terms: ["wallet", "kms"] },

  // 3. Issue credentials
  { id: "schemas", route: "/wallet/credentials/schemas", group: "issue", order: 7, icon: FileJson2, terms: ["schema", "verifiable-credential", "sd-jwt"] },
  { id: "credential-templates", route: "/wallet/credentials/templates", group: "issue", order: 8, icon: FileBadge, terms: ["credential-template", "schema", "issuer"] },
  { id: "issued-credentials", route: "/wallet/credentials/issued", group: "issue", order: 9, icon: BadgeCheck, terms: ["issued-credential", "api", "holder", "issuer"] },

  // 4. Verify credentials
  { id: "verification-templates", route: "/wallet/credentials/verification-templates", group: "verify", order: 10, icon: ClipboardList, terms: ["verification-template", "dcql", "verifier", "presentation-request"] },
  { id: "verification-submissions", route: "/wallet/credentials/verification-submissions", group: "verify", order: 11, icon: Inbox, terms: ["presentation-response", "verifier", "holder"] },

  // 5. SVX Verify
  { id: "svx-configuration", route: "/verify/configuration", group: "svx", order: 12, icon: ScanFace, terms: ["svx-verify"] },
]

export const STEP_ORDER = STEPS.map((s) => s.id)

export const TOTAL_STEPS = STEPS.length

export function stepById(id: string): Step | undefined {
  return STEPS.find((s) => s.id === id)
}

export function stepByRoute(pathname: string): Step | undefined {
  return STEPS.find((s) => s.route === pathname)
}

export function prevStep(id: string): Step | undefined {
  const i = STEP_ORDER.indexOf(id)
  return i > 0 ? STEPS[i - 1] : undefined
}

export function nextStep(id: string): Step | undefined {
  const i = STEP_ORDER.indexOf(id)
  return i >= 0 && i < STEPS.length - 1 ? STEPS[i + 1] : undefined
}

export function stepsInGroup(group: GroupId): Step[] {
  return STEPS.filter((s) => s.group === group)
}
