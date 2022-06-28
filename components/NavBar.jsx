import React from "react";
import Link from "next/link";
import { getSession, useSession, signIn, signOut } from "next-auth/react";

function NavBar() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between my-2 mx-8 md:mx-24 relatived sticky">
      <div className="p-6 border-2 border-blue-500 bg-red-800 rounded-full h-8 w-8 justify-center items-center flex cursor-pointer transition-transform duration-150 ease-out hover:scale-150">
        <p className=" text-gray-100 font-cinzel text-lg">
          <Link href="/">DF</Link>
        </p>
      </div>
      <div className="text-xl font-poppins  flex space-x-4 text-gray-500 cursor-pointer relative border-none bg-transparent justify-center items-center">
        {session && (
          <p className="text-md capitalize italic ">
            {" "}
            <small>wecome</small> {session?.user?.name}
          </p>
        )}
        <div className="transition-all duration-200 hover:bg-gray-200 p-2 rounded-lg">
          {!session ? (
            <p onClick={() => signIn("google")}>SignIn</p>
          ) : (
            <p onClick={signOut}>SignOut</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
