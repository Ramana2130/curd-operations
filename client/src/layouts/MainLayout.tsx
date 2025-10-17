import { AppSidebar } from '@/components/sidebar/app-sidebar'
import {  SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <SidebarProvider>
    <div className='flex min-h-screen'>
        <AppSidebar />
        <div>
            <Outlet />
        </div>
    </div>
    </SidebarProvider>
  )
}

export default MainLayout