import {
  SignOutButton,
  UserButton,
  currentUser,
  SignInButton,
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toogle";
import initialProfile from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import NavBar from "@/components/navbar";


export default async function Home() {


  const profile = await initialProfile();

  if (!profile) {
    return (
      <>
      <NavBar/>
        <div className=" w-full h-full flex items-center justify-center relative overflow-hidden z-[2] " >
        <svg aria-label="Vercel&#x27;s logo, a triangle, sits in the center of a grid, surrounded by rays of light which are the colors of the rainbow." className=" w-full h-full inset-0 absolute" fill="none" role="img" viewBox="0 0 1200 700">
                                            <polygon fill="black" points="426,650.4589468389948 774,650.4589468389948 600,349.0821063220102"></polygon>
                                            <line opacity="1" stroke="#FFFFFF" x1="600" x2="774" y1="349.0821063220102" y2="650.4589468389948"></line>
                                            <line opacity="1" stroke="#FFFFFF" x1="600" x2="426" y1="349.0821063220102" y2="650.4589468389948"></line>
                                            <line opacity="0.9714285714285714" stroke="#FFFFFF" x1="600" x2="774" y1="354.06899355518175" y2="650.4589468389948"></line>
                                            <line opacity="0.9714285714285714" stroke="#FFFFFF" x1="600" x2="426" y1="354.06899355518175" y2="650.4589468389948"></line>
                                            <line opacity="0.9428571428571428" stroke="#FFFFFF" x1="600" x2="774" y1="359.05588078835336" y2="650.4589468389948"></line>
                                            <line opacity="0.9428571428571428" stroke="#FFFFFF" x1="600" x2="426" y1="359.05588078835336" y2="650.4589468389948"></line>
                                            <line opacity="0.9142857142857143" stroke="#FFFFFF" x1="600" x2="774" y1="364.0427680215249" y2="650.4589468389948"></line>
                                            <line opacity="0.9142857142857143" stroke="#FFFFFF" x1="600" x2="426" y1="364.0427680215249" y2="650.4589468389948"></line>
                                            <line opacity="0.8857142857142857" stroke="#FFFFFF" x1="600" x2="774" y1="369.0296552546965" y2="650.4589468389948"></line>
                                            <line opacity="0.8857142857142857" stroke="#FFFFFF" x1="600" x2="426" y1="369.0296552546965" y2="650.4589468389948"></line>
                                            <line opacity="0.8571428571428572" stroke="#FFFFFF" x1="600" x2="774" y1="374.01654248786804" y2="650.4589468389948"></line>
                                            <line opacity="0.8571428571428572" stroke="#FFFFFF" x1="600" x2="426" y1="374.01654248786804" y2="650.4589468389948"></line>
                                            <line opacity="0.8285714285714285" stroke="#FFFFFF" x1="600" x2="774" y1="379.00342972103965" y2="650.4589468389948"></line>
                                            <line opacity="0.8285714285714285" stroke="#FFFFFF" x1="600" x2="426" y1="379.00342972103965" y2="650.4589468389948"></line>
                                            <line opacity="0.8" stroke="#FFFFFF" x1="600" x2="774" y1="383.9903169542112" y2="650.4589468389948"></line>
                                            <line opacity="0.8" stroke="#FFFFFF" x1="600" x2="426" y1="383.9903169542112" y2="650.4589468389948"></line>
                                            <line opacity="0.7714285714285715" stroke="#FFFFFF" x1="600" x2="774" y1="388.97720418738277" y2="650.4589468389948"></line>
                                            <line opacity="0.7714285714285715" stroke="#FFFFFF" x1="600" x2="426" y1="388.97720418738277" y2="650.4589468389948"></line>
                                            <line opacity="0.7428571428571429" stroke="#FFFFFF" x1="600" x2="774" y1="393.9640914205544" y2="650.4589468389948"></line>
                                            <line opacity="0.7428571428571429" stroke="#FFFFFF" x1="600" x2="426" y1="393.9640914205544" y2="650.4589468389948"></line>
                                            <line opacity="0.7142857142857143" stroke="#FFFFFF" x1="600" x2="774" y1="398.95097865372594" y2="650.4589468389948"></line>
                                            <line opacity="0.7142857142857143" stroke="#FFFFFF" x1="600" x2="426" y1="398.95097865372594" y2="650.4589468389948"></line>
                                            <line opacity="0.6857142857142857" stroke="#FFFFFF" x1="600" x2="774" y1="403.9378658868975" y2="650.4589468389948"></line>
                                            <line opacity="0.6857142857142857" stroke="#FFFFFF" x1="600" x2="426" y1="403.9378658868975" y2="650.4589468389948"></line>
                                            <line opacity="0.6571428571428571" stroke="#FFFFFF" x1="600" x2="774" y1="408.92475312006906" y2="650.4589468389948"></line>
                                            <line opacity="0.6571428571428571" stroke="#FFFFFF" x1="600" x2="426" y1="408.92475312006906" y2="650.4589468389948"></line>
                                            <line opacity="0.6285714285714286" stroke="#FFFFFF" x1="600" x2="774" y1="413.91164035324067" y2="650.4589468389948"></line>
                                            <line opacity="0.6285714285714286" stroke="#FFFFFF" x1="600" x2="426" y1="413.91164035324067" y2="650.4589468389948"></line>
                                            <line opacity="0.6" stroke="#FFFFFF" x1="600" x2="774" y1="418.89852758641223" y2="650.4589468389948"></line>
                                            <line opacity="0.6" stroke="#FFFFFF" x1="600" x2="426" y1="418.89852758641223" y2="650.4589468389948"></line>
                                            <line opacity="0.5714285714285714" stroke="#FFFFFF" x1="600" x2="774" y1="423.8854148195838" y2="650.4589468389948"></line>
                                            <line opacity="0.5714285714285714" stroke="#FFFFFF" x1="600" x2="426" y1="423.8854148195838" y2="650.4589468389948"></line>
                                            <line opacity="0.5428571428571429" stroke="#FFFFFF" x1="600" x2="774" y1="428.87230205275534" y2="650.4589468389948"></line>
                                            <line opacity="0.5428571428571429" stroke="#FFFFFF" x1="600" x2="426" y1="428.87230205275534" y2="650.4589468389948"></line>
                                            <line opacity="0.5142857142857142" stroke="#FFFFFF" x1="600" x2="774" y1="433.85918928592696" y2="650.4589468389948"></line>
                                            <line opacity="0.5142857142857142" stroke="#FFFFFF" x1="600" x2="426" y1="433.85918928592696" y2="650.4589468389948"></line>
                                            <line opacity="0.48571428571428577" stroke="#FFFFFF" x1="600" x2="774" y1="438.8460765190985" y2="650.4589468389948"></line>
                                            <line opacity="0.48571428571428577" stroke="#FFFFFF" x1="600" x2="426" y1="438.8460765190985" y2="650.4589468389948"></line>
                                            <line opacity="0.4571428571428572" stroke="#FFFFFF" x1="600" x2="774" y1="443.8329637522701" y2="650.4589468389948"></line>
                                            <line opacity="0.4571428571428572" stroke="#FFFFFF" x1="600" x2="426" y1="443.8329637522701" y2="650.4589468389948"></line>
                                            <line opacity="0.4285714285714286" stroke="#FFFFFF" x1="600" x2="774" y1="448.8198509854417" y2="650.4589468389948"></line>
                                            <line opacity="0.4285714285714286" stroke="#FFFFFF" x1="600" x2="426" y1="448.8198509854417" y2="650.4589468389948"></line>
                                            <line opacity="0.4" stroke="#FFFFFF" x1="600" x2="774" y1="453.80673821861325" y2="650.4589468389948"></line>
                                            <line opacity="0.4" stroke="#FFFFFF" x1="600" x2="426" y1="453.80673821861325" y2="650.4589468389948"></line>
                                            <line opacity="0.37142857142857144" stroke="#FFFFFF" x1="600" x2="774" y1="458.7936254517848" y2="650.4589468389948"></line>
                                            <line opacity="0.37142857142857144" stroke="#FFFFFF" x1="600" x2="426" y1="458.7936254517848" y2="650.4589468389948"></line>
                                            <line opacity="0.34285714285714286" stroke="#FFFFFF" x1="600" x2="774" y1="463.7805126849564" y2="650.4589468389948"></line>
                                            <line opacity="0.34285714285714286" stroke="#FFFFFF" x1="600" x2="426" y1="463.7805126849564" y2="650.4589468389948"></line>
                                            <line opacity="0.3142857142857143" stroke="#FFFFFF" x1="600" x2="774" y1="468.767399918128" y2="650.4589468389948"></line>
                                            <line opacity="0.3142857142857143" stroke="#FFFFFF" x1="600" x2="426" y1="468.767399918128" y2="650.4589468389948"></line>
                                            <line opacity="0.2857142857142857" stroke="#FFFFFF" x1="600" x2="774" y1="473.75428715129954" y2="650.4589468389948"></line>
                                            <line opacity="0.2857142857142857" stroke="#FFFFFF" x1="600" x2="426" y1="473.75428715129954" y2="650.4589468389948"></line>
                                            <line opacity="0.2571428571428571" stroke="#FFFFFF" x1="600" x2="774" y1="478.74117438447115" y2="650.4589468389948"></line>
                                            <line opacity="0.2571428571428571" stroke="#FFFFFF" x1="600" x2="426" y1="478.74117438447115" y2="650.4589468389948"></line>
                                            <line opacity="0.22857142857142854" stroke="#FFFFFF" x1="600" x2="774" y1="483.72806161764265" y2="650.4589468389948"></line>
                                            <line opacity="0.22857142857142854" stroke="#FFFFFF" x1="600" x2="426" y1="483.72806161764265" y2="650.4589468389948"></line>
                                            <line opacity="0.19999999999999996" stroke="#FFFFFF" x1="600" x2="774" y1="488.71494885081427" y2="650.4589468389948"></line>
                                            <line opacity="0.19999999999999996" stroke="#FFFFFF" x1="600" x2="426" y1="488.71494885081427" y2="650.4589468389948"></line>
                                            <line opacity="0.17142857142857137" stroke="#FFFFFF" x1="600" x2="774" y1="493.7018360839858" y2="650.4589468389948"></line>
                                            <line opacity="0.17142857142857137" stroke="#FFFFFF" x1="600" x2="426" y1="493.7018360839858" y2="650.4589468389948"></line>
                                            <line opacity="0.1428571428571429" stroke="#FFFFFF" x1="600" x2="774" y1="498.6887233171574" y2="650.4589468389948"></line>
                                            <line opacity="0.1428571428571429" stroke="#FFFFFF" x1="600" x2="426" y1="498.6887233171574" y2="650.4589468389948"></line>
                                            <line opacity="0.11428571428571432" stroke="#FFFFFF" x1="600" x2="774" y1="503.675610550329" y2="650.4589468389948"></line>
                                            <line opacity="0.11428571428571432" stroke="#FFFFFF" x1="600" x2="426" y1="503.675610550329" y2="650.4589468389948"></line>
                                            <line opacity="0.08571428571428574" stroke="#FFFFFF" x1="600" x2="774" y1="508.66249778350056" y2="650.4589468389948"></line>
                                            <line opacity="0.08571428571428574" stroke="#FFFFFF" x1="600" x2="426" y1="508.66249778350056" y2="650.4589468389948"></line>
                                            <line opacity="0.05714285714285716" stroke="#FFFFFF" x1="600" x2="774" y1="513.6493850166721" y2="650.4589468389948"></line>
                                            <line opacity="0.05714285714285716" stroke="#FFFFFF" x1="600" x2="426" y1="513.6493850166721" y2="650.4589468389948"></line>
                                            <line opacity="0.02857142857142858" stroke="#FFFFFF" x1="600" x2="774" y1="518.6362722498437" y2="650.4589468389948"></line>
                                            <line opacity="0.02857142857142858" stroke="#FFFFFF" x1="600" x2="426" y1="518.6362722498437" y2="650.4589468389948"></line>
                                        </svg>
        </div>

        <SignInButton></SignInButton>
      </>
    );
  }

 

   return redirect(`/dashboard/${profile.username}-projects`)
  
}
