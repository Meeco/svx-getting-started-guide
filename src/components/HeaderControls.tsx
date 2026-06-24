import { LangSwitcher } from "@/components/LangSwitcher"
import { ThemeToggle } from "@/components/ThemeToggle"

/** Shared header cluster: language switcher + light/dark toggle. */
export function HeaderControls() {
  return (
    <div className="flex items-center gap-1">
      <LangSwitcher />
      <ThemeToggle />
    </div>
  )
}
