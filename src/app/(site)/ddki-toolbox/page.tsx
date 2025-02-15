
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import { Metadata } from "next";
import { Feature } from "@/types/feature";
import Features from "@/components/DDKI-Toolbox/Tools"


export const metadata: Metadata = {
  title: "Über uns | DeepDive KI ToolBox und KI Fortbildungen",
  description: "Über uns DeepDive KI ToolBox und KI Fortbildungen",
  // other metadata
};

const DDKIToolbox = () => {
    return (
      <div className="ddki-toolbox-page">
        <Features />
        <CallToAction />
      </div>
    );
  };
  
  export default DDKIToolbox;