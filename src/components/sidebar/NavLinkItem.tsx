import { NavLink } from "react-router-dom";

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

  return (
    <NavLink
      onClick={() => setOpen(false)}
      to={item.href}
      className={({ isActive }) =>
        `flex p-2 my-1 text-sm font-semibold leading-6 rounded-md gap-x-3 hover:text-[#FD4718] ${
          isActive ? "bg-gray-400 text-[#FD4718]" : "text-gray-300"
        }`
      }
      end
    >
      <IconComponent className="w-5 h-5" /> {/* Render the icon */}
      {item.name}
    </NavLink>
  );
};

export default NavLinkItem;
