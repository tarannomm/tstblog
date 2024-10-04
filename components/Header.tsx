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
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const logoutHandler = async () => {
    const response = await fetch("/Api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      toast.success("شما با موفقیت خارج شدید");
      router.push("/login");
    } else {
      toast.error("خطا در خروج");
    }
  };

  return (
    <Navbar className="border-b-1 py-2">
      <NavbarBrand>
        <p
          className="font-bold text-inherit text-[20px] cursor-pointer"
          onClick={() => router.replace("/posts")}
        >
          وبلاگ
        </p>
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
  );
};

export default Header;
