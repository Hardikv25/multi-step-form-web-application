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

// This is sample data.
const data = {
  teams: [
    {
      name: "Multi Step Form",
      logo: GalleryVerticalEnd,
      plan: "Forms",
    },
  ],
  navMain: [
    {
      title: "Personal Information",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Basic Information",
          url: "/personal-info/basic-information",
        },
        {
          title: "Demographics",
          url: "/personal-info/demographics",
        },
        {
          title: "Education Qualification",
          url: "/personal-info/education-info",
        },
      ],
    },
    {
      title: "Contact Details",
      url: "#",
      icon: Contact,
      items: [
        {
          title: "Address Information",
          url: "/contact-info/address-info",
        },
        {
          title: "Phone Information",
          url: "/contact-info/phone-info",
        }
      ],
    },
    {
      title: "Preferences",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Communication Preferences",
          url: "#",
        },
        {
          title: "Terms and Conditions",
          url: "#",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
