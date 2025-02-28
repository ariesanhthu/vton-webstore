"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Cart from "../Cart";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
      
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl">
      <Link href="/" className="flex items-center gap-4 transition-opacity hover:opacity-90">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg p-0">
            <Image 
              src="/logo.jpg"
              alt="logo"
              fill
              className="object-cover object-center p-0 m-0"
              priority
            />
          </div>
          <h1 className="text-2xl md:text-xl font-bold">
            VTON CLOTHING<span className="text-primary"> STORE</span>
          </h1>
        </Link>
      <Link href="/" className="text-black hover:text-slate-600 hover:border-[2px] border-black py-1 px-2 rounded-sm font-bold">Home</Link>
      <Link href="/VTOnRoom" className="text-black hover:text-slate-600 hover:border-[2px] border-black py-1 px-2 rounded-sm font-bold">Try-on Clothes</Link>
        {!isSignedIn ? (
            <div className="flex gap-4">
                <div className="text-white btn rounded-lg bg-gray-950 py-2 px-4 hover:bg-gray-900 transition">
                    <SignInButton fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/">
                        Sign In
                    </SignInButton>
                </div>

                <div className="px-4 py-2 border-gray-950 border text-black rounded-lg hover:bg-gray-200 transition">
                    <SignUpButton signInFallbackRedirectUrl="/" fallbackRedirectUrl="/">
                        Sign Up
                    </SignUpButton>
                </div>
          </div>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
