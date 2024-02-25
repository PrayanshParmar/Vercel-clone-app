import React from "react";


const Dasahboardlayout = async ({children}:{children: React.ReactNode}) => {

  return (
    <div className="h-full" >
      <div>
      </div>
      <main className=" h-full flex items-center justify-center" >
      {children}
      </main>
    </div>
  );

};

export default Dasahboardlayout;