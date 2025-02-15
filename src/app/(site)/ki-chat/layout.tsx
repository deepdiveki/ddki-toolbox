"use client";

import { useState } from 'react';
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import cx from "classnames";
import ChatbotAnimation from "@/components/ChatbotToolAnimation";

export default function KiChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Head>
        <title>KI-Chat</title>
        <meta name="description" content="KI-Assistent" />
      </Head>

      <div className="flex flex-col h-screen">
  <div className="flex items-center justify-center gap-4 mt-2">
    <div className="mt-10">
      <ChatbotAnimation />
    </div>
    <Breadcrumb pageTitle="KI-Chat" />
  </div>

  <div className="flex-1">{children}</div>

        {/* Footer or additional buttons */}
        <div className="sticky bottom-0 bg-transparent">
          <div className="absolute bottom-10">
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
                  "bg-gray-800": showMenu,
                  "bg-transparent hover:bg-gray-800 ml-110": !showMenu,
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
