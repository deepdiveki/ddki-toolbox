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
      <div className="flex flex-col bg-transparent">

          {children}

          {/* Left Column: Chats button */}
          <div className="pb-[105px]">
            {/* Conditionally rendered menu below the header */}
            {showMenu && (
              <div className="flex flex-col bg-transparent">
                <button className=" w-30 py-2 ml-110 bg-transparent border-r border-gray-500 text-white hover:bg-gray-800">
                  Chats
                </button>
                <button className=" w-30 py-2 ml-110 bg-transparent border-r border-gray-500 text-white hover:bg-gray-800">
                   KI-Modell
                </button>
              </div>
            )}

            <button
              className={cx(
                "absolute bottom-120 w-30 py-2 ml-110  text-white",
                {
                  "border-r border-gray-500 bg-gray-800": showMenu, // when menu is open, keep gray
                  "border-r border-gray-500 bg-transparent hover:bg-gray-800": !showMenu, // otherwise, transparent and change on hover
                }
              )}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              Menü
            </button>
          </div>



      </div>
    </>
  );
}
