import { SidebarLogo } from "./SidebarLogo";
import { SidebarNav } from "./SidebarNav";
import { SidebarSearch } from "./SidebarSearch";
import { UserAccountDropdown } from "./UserAccountDropdown";

interface DesktopNavProps {
  // add props here
}

export function DesktopNav(props: DesktopNavProps) {
  return (
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
      <SidebarLogo />
      {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
      <div class="mt-6 flex h-0 flex-1 flex-col overflow-y-auto">
        {/* <!-- User account dropdown --> */}
        <UserAccountDropdown />
        {/* <!-- Sidebar Search --> */}
        <SidebarSearch />
        {/* <!-- Navigation --> */}
        <SidebarNav />
      </div>
    </div>
  );
}
