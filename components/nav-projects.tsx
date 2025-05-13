"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {

  const pathname = usePathname();
    const t = useTranslations('Sidebar');
  

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('dashboard')}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton tooltip={item.name} asChild>
              <Link href={item.url} className={`flex items-center gap-2 
              ${pathname === item.url ? "bg-black text-white hover:bg-neutral-800"
                  : "text-gray-700 hover:bg-gray-200"}`}>
                <item.icon className="size-4" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
