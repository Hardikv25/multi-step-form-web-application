"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import { formSteps } from "@/utils/form-steps"
import { getFormData } from "@/utils/formStorage"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('Sidebar');
  const [enabledPaths, setEnabledPaths] = useState<string[]>([])
  const [openGroupTitle, setOpenGroupTitle] = useState<string | null>(null)

  useEffect(() => {
    const enabled: string[] = []
    for (let i = 0; i < formSteps.length; i++) {
      const step = formSteps[i]
      const value = getFormData(step.categoryName, step.formName)
      const isFilled = value && Object.keys(value).length > 0

      enabled.push(step.path)
      if (!isFilled) break
    }
    setEnabledPaths(enabled)
  }, [])

  useEffect(() => {
    const matchedGroup = items.find((group) =>
      group.items?.some((sub) => sub.url === pathname)
    )
    setOpenGroupTitle(matchedGroup?.title ?? null)
  }, [pathname, items])

  const isEnabled = (url: string) => enabledPaths.includes(url)

  const handleToggle = (title: string) => {
    setOpenGroupTitle((prev) => (prev === title ? null : title))
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('forms')}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isOpen = openGroupTitle === item.title
          return (
            <Collapsible key={item.title} open={isOpen} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild onClick={() => handleToggle(item.title)}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight
                      className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-90" : ""
                        }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const active = pathname === subItem.url
                      const enabled = isEnabled(subItem.url)

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <button
                              onClick={() => enabled && router.push(subItem.url)}
                              className={`w-full text-left flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${active
                                  ? "bg-black text-white hover:bg-neutral-800"
                                  : enabled
                                    ? "text-gray-900 hover:bg-gray-200"
                                    : "text-gray-400 cursor-not-allowed"
                                }`}
                            >
                              <span>{subItem.title}</span>
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
