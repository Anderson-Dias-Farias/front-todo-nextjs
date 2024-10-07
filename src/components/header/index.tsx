import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import Logof from "./Logof";
import { getCookie } from "@/hooks/get-cookie";
import Link from "next/link";

export default async function Header() {
  const token = await getCookie()
  return <header className="flex justify-between items-center w-full px-4 py-2 text-white absolute top-0 left-0">
    <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">Todo List</h1>
    </Link>
    <div className="flex items-center gap-2">
      <Logof token={token} />
    </div>
  </header>
}