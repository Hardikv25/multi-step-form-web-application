"use client"

import * as React from "react"
import {
  BookOpen,
  Contact,
  GalleryVerticalEnd,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavProjects } from "./nav-projects"
import { useTranslations } from 'next-intl';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('Sidebar');
  const data = {
    teams: [
      {
        name: t('title'),
        logo: GalleryVerticalEnd,
        plan: t('forms'),
      },
    ],
    projects: [
      {
        name: t('dashboard'),
        url: "/",
        icon: PieChart,
      },
    ],
    navMain: [
      {
        title: t('personal-info'),
        url: "#",
        icon: SquareTerminal,
        items: [
          {
            title: t('basic-info'),
            url: "/personal-info/basic-information",
          },
          {
            title: t('demographics'),
            url: "/personal-info/demographics",
          },
          {
            title: t('education-info'),
            url: "/personal-info/education-info",
          },
        ],
      },
      {
        title: t('contact-info'),
        url: "#",
        icon: Contact,
        items: [
          {
            title: t('address-info'),
            url: "/contact-info/address-info",
          },
          {
            title: t('phone-info'),
            url: "/contact-info/phone-info",
          }
        ],
      },
      {
        title: t('preferences'),
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: t('communication-preferences'),
            url: "/preferences/communication-pref",
          },
          {
            title: t('terms-and-conditions'),
            url: "/preferences/term-condition",
          }
        ],
      },
    ],

  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
