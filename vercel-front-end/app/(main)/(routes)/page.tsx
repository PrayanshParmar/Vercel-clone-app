import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toogle";


export default function Home() {
  return (
    <div className=" flex items-center justify-center gap-2" >
      <p className=" text-xl font-bold text-blue-300" >Hello there</p>
      <UserButton afterSignOutUrl="/"/>
      <ModeToggle/>
    </div>
  );
}
