"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

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

import { formSteps } from "@/components/form-steps"

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
  const pathname = usePathname();
  const router = useRouter();
  const [enabledPaths, setEnabledPaths] = useState<string[]>([]);

  useEffect(() => {
    const enabled: string[] = [];

    for (let i = 0; i < formSteps.length; i++) {
      const step = formSteps[i && i];
      const value = localStorage.getItem(step.key);
      const isFilled = value && value !== "null" && value !== "{}";

      if (isFilled) {
        enabled.push(step.path);
      } else {
        enabled.push(step.path);
        break;
      }
    }

    setEnabledPaths(enabled);
  }, []);

  const isEnabled = (url: string) => enabledPaths.includes(url);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Forms</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isOpen = item.items?.some((sub) => pathname === sub.url);
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const active = pathname === subItem.url;
                      const enabled = isEnabled(subItem.url);
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <button
                              
                              onClick={() => enabled && router.push(subItem.url)}
                              className={`w-full text-left flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${active
                                  ? "bg-black text-white hover:bg-neutral-800"
                                  : enabled
                                    ? "text-gray-700 hover:bg-gray-200"
                                    : "text-gray-400 cursor-not-allowed"
                                }`}
                            >
                              <span>{subItem.title}</span>
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
