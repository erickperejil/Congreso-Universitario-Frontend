'use client'

import Cronograma from "@/components/cronograma";

export default function Conferences() {
  return (
    <div>
      <h2 className="text-3xl text-black border-b-[1px] border-gray-300 pb-1 mb-2">Conferencias</h2>
      <div className="h-screen w-full overflow-y-scroll">
        <Cronograma
          customStyles={{
            container: "border-[#101017] shadow-md shadow-slate-700",
            header: "bg-[#101017] text-slate-100",
            button: "border-slate-800 text-slate-800",
            imageContainer: "border-blue-400 border-b-transparent",
            ponente: "border-b-blue-200 border-x-blue-200 border-t-transparent",
            content: "border-transparent",
            datosimportantes: "text-slate-800 "
          }}
          dayButtonStyles={{
            default: "text-[#101017] border-[#101017]",
            selected: "bg-[#101017] text-slate-100",
            hover: "hover:text-[#101017] ",
          }}
          titleStyles="hidden"
        />
      </div>

    </div>
  );
}