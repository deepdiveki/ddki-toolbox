'use client';

import { useRouter } from 'next/navigation';
import { PlusIcon } from '@/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/chat/ui/sidebar';

export function AppSidebar() {
  const router = useRouter();

  return (
    <Sidebar className="bg-gray-900 text-white shadow-md">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
              DDKI Chat
            </span>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Add sidebar content here */}
      </SidebarContent>
    </Sidebar>
  );
}
