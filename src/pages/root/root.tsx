import { Outlet } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { DesktopNav, MobileNav, SearchHeader } from "./components";

interface RootProps {
  // add props here
}

function Root(props: RootProps) {
  const [openMobileNav, setOpenMobileNav] = createSignal(false);

  const handleCloseMobileNav = () => {
    setOpenMobileNav(false);
  };
  const handleOpenMobileNav = () => {
    setOpenMobileNav(true);
  };

  return (
    <div class="min-h-full">
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <Show when={openMobileNav()}>
        <MobileNav onClose={handleCloseMobileNav} />
      </Show>

      {/* <!-- Static sidebar for desktop --> */}
      <DesktopNav />
      {/* <!-- Main column --> */}
      <div class="flex flex-col lg:pl-64">
        {/* <!-- Search header --> */}
        <SearchHeader onOpenMobileNav={handleOpenMobileNav} />
        <main class="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Root;
