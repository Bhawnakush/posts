import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <header className="bg-stone-100 p-8">
        <nav className="container">
          <ul className="flex flex-row gap-8 list-none m-0 p-0">
            <li>
              <Link href="/" className="text-sm font-medium uppercase text-stone-400 hover:text-stone-600">
                Home
              </Link>
            </li>
           
          </ul>
        </nav>
      </header>
      <main className="container p-8">{children}</main>
      <footer className="bg-stone-100 text-sm font-medium uppercase text-stone-400 px-8 py-4">
        <div className="container">
       
          
        </div>
      </footer>
    </>
  );
}
