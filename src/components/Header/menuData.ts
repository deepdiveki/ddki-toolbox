import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "https://deepdive-ki.de/",
  },
  {
    id: 2,
    title: "Über uns",
    newTab: false,
    path: "https://deepdive-ki.de/about",
  },
  {
    id: 6,
    title: "DDKI ToolBox",
    newTab: false,
    path: "/ddki-toolbox",
    submenu: [
      {
        id: 66,
        title: "Arbeitsblatt Generator",
        newTab: false,
        //path: "https://ddki-chat.vercel.app/",
        path: "/ddki-toolbox/arbeitsblatt-generator"
      },
      {
        id: 67,
        title: "KI Chatbot",
        newTab: false,
        //path: "https://ddki-chat.vercel.app/",
        path: "/ddki-toolbox/ki-chat",
      },
      {
        id: 69,
        title: "Persona Chat",
        newTab: false,
        //path: "https://ddki-chat.vercel.app/",
        path: "/ddki-toolbox/personachat",
      },
      {
        id: 68,
        title: "KI-Assistent",
        newTab: false,
        //path: "https://ddki-chat.vercel.app/",
        path: "/ddki-toolbox/ki-assistent",
      },
      {
        id: 70,
        title: "QR Code Generator",
        newTab: false,
        //path: "https://ddki-chat.vercel.app/",
        path: "/ddki-toolbox/qrcode-generator",
      },
    ],
  },
  {
    id: 7,
    title: "Chatbot für Ihre Schule ",
    newTab: false,
    path: "https://deepdive-ki.de/chatbot-fuer-ihre-schule"
  },
  {
    id: 5,
    title: "Fortbildungen",
    newTab: false,
    path: "https://deepdive-ki.de/fortbildungen"
  },



];
export default menuData;
