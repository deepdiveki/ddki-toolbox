"use client";

import { useState } from 'react';
import Breadcrumb from "@/components/Breadcrumb";
import cx from "classnames";


export default function KiChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMenu, setShowMenu] = useState(false);

 return (
  <>
    <Breadcrumb pageTitle="KI-Chat" />
    <div className="flex flex-col bg-transparent h-screen">
      {/* Main content area */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer or additional buttons */}
      <div className="sticky bottom-0 bg-transparent">
        {/* Left Column: Chats button */}
        <div className="absolute bottom-10">
          {/* Conditionally rendered menu below the header */}
          {showMenu && (
            <>
              <button className="ml-50 w-30 py-2 bg-transparent border-r border-gray-500 text-white hover:bg-gray-800">
                Chats
              </button>
              <button className="w-30 py-2 bg-transparent border-r border-gray-500 text-white hover:bg-gray-800">
                KI-Modell
              </button>
            </>
          )}

          <button
            className={cx(
              "w-30 py-2 text-white border-r border-gray-500",
              {
                "bg-gray-800": showMenu, // when menu is open, keep gray
                "bg-transparent hover:bg-gray-800 ml-110": !showMenu, // otherwise, transparent and change on hover
              }
            )}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            Menü
          </button>
        </div>
      </div>
    </div>
  </>
);
}
