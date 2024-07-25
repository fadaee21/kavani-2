import { NavLink, useLocation } from "react-router-dom";

interface NavLinkItemProps {
  item: {
    href: string;
    name: string;
    icon: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
      }
    >;
  };
  setOpen: (open: boolean) => void;
}

const NavLinkItem = ({ item, setOpen }: NavLinkItemProps) => {
  const IconComponent = item.icon; // Extract the icon component
  const location = useLocation();

  const isActive = location.pathname.startsWith(item.href);
  //!NOTE: there is a bug for nested route that doesn't show which route is active now
  //! for now i use the location.pathname to check if the route is active
  //! but later if isActive argument in className of NavLinkItem debug this issue
  return (
    <NavLink
      onClick={() => setOpen(false)}
      to={item.href}
      className={`flex p-2 my-1 text-sm font-semibold leading-6 rounded-md gap-x-3 hover:text-[#FD4718] ${
        isActive ? "bg-gray-400 text-[#FD4718]" : "text-gray-300"
      }`}
    >
      <IconComponent className="w-5 h-5" /> {/* Render the icon */}
      {item.name}
    </NavLink>
  );
};

// const MemoizedNavLinkItem = memo(NavLinkItem);

export default NavLinkItem;
