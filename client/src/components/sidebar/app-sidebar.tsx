import * as React from "react"
import {
  GalleryVerticalEnd,
  GraduationCap,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc.",
      logo: GalleryVerticalEnd,
      plan: "Institutional",
    }
  ],
  navMain: [
    {
      title: "Students",
      url: "#",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "Student List",
          url: "#",
        },
      ],
    },
    {
      title: "Staffs",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Staff List",
          url: "#",
        },

      ],
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
