import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className=" w-full h-[120px] flex flex-col sm:flex-row sm:px-4 items-center justify-center gap-3 sm:gap-0 sm:justify-between  border-b " >
        <h2 className=" font-medium text-3xl ">react-test</h2>
        <div className=" flex space-x-3 items-center" >
        <Button variant="outline"  >Repository</Button>
        <Button variant="outline"  >Domains</Button>
        <Button variant="default"  >Visit</Button>
            </div>
    </div>
  ) ;
};

export default Page;