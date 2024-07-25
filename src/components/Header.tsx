import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";

export default function Header() {
  return (
    <Navbar>
      <NavbarContent justify="start" />
      <NavbarContent justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit text-2xl">Cuble</Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="#">Login</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
