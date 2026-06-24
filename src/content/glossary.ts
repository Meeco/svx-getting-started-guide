/**
 * All glossary term ids. Labels + definitions are resolved from i18n
 * (`terms.<id>.label` / `terms.<id>.def`) so they translate per locale.
 * The <Term> component and the /glossary page both read from this list.
 */
export const TERM_IDS = [
  "portal",
  "tenant",
  "tenant-admin",
  "organisation",
  "application",
  "deployment",
  "wallet",
  "wallet-url",
  "api-key",
  "api",
  "admin-account",
  "passkey",
  "kms",
  "bridge",
  "verifiable-credential",
  "claim",
  "schema",
  "sd-jwt",
  "vct",
  "credential-template",
  "issuer",
  "issued-credential",
  "revocation",
  "holder",
  "verification-template",
  "dcql",
  "verifier",
  "presentation-request",
  "presentation-response",
  "svx-verify",
  "svx-platform",
  "identity-provider",
] as const

export type TermId = (typeof TERM_IDS)[number]
