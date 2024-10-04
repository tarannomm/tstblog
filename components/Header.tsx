"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const Header: React.FC = () => {
  const pathname=usePathname();
  const router = useRouter();
  const logoutHandler=()=>{
    deleteCookie('token');
    deleteCookie("token", { path: "/", domain: window.location.hostname });
    router.replace("/login");
    
  }
  if(pathname==="/login"){
    return null
  }
  else{
  return (
    <Navbar className=" border-b-1 py-2">
      <NavbarBrand>
        <p className="font-bold text-inherit text-[20px]">خانه</p>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="azimi"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">azimi</p>
              <p className="font-semibold">tarannom.azimi99@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logoutHandler}>
              خروج از حساب کاربری
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );}
};

export default Header;