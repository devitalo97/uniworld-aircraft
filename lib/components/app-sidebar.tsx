import { Home, Plane, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/lib/components/ui/sidebar"
import { PowerIcon } from "@heroicons/react/24/outline"
import { logout } from "../action"
import { ModeToggle } from "./theme-toggle"

// Itens do menu.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Flight List",
    url: "/flight-list",
    icon: Plane,
  },
  {
    title: "Search",
    url: "/flight-list/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/configuration",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    // Aqui garantimos que a sidebar ocupe toda a altura e organize os elementos em coluna.
    <Sidebar className="flex flex-col h-full">
      <SidebarContent className="flex flex-col flex-1">
        {/* Área principal do menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Uniworld Aircargo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center">
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <form action={logout}>
                  <SidebarMenuButton type="submit">
                    <PowerIcon className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </form>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Área do toggle, posicionado no final da sidebar */}
        <SidebarGroup className="mt-auto mb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <ModeToggle />
                <span className="ml-2">Theme</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
