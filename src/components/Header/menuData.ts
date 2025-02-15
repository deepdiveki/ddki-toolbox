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
    path: "/",
    submenu: [
      {
        id: 66,
        title: "Arbeitsblatt Generator",
        newTab: false,
        path: "/arbeitsblatt-generator"
      },
      {
        id: 67,
        title: "KI-Chat",
        newTab: false,
        path: "/ki-chat",
      },
      {
        id: 69,
        title: "Persona Chat",
        newTab: false,
        path: "/personachat",
      },
      {
        id: 68,
        title: "Chat mit PDF",
        newTab: false,
        path: "/chat-mit-pdf",
      },
      {
        id: 70,
        title: "QR Code Generator",
        newTab: false,
        path: "/qrcode-generator",
      },
      {
        id: 68,
        title: "KI-Assistant erstellen",
        newTab: false,
        path: "/ki-assistent",
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
