interface SidebarLogoProps {
  // add props here
}

export function SidebarLogo(props: SidebarLogoProps) {
  return (
    <div class="flex flex-shrink-0 items-center px-6">
      <img
        class="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500"
        alt="Your Company"
      />
    </div>
  );
}
