import Cronograma from "@/components/cronograma";

export default function MyInscriptions() {
  return (
    <div className="h-screen w-full overflow-y-scroll">
      <Cronograma
        customStyles={{
          container: "border-blue-500 shadow-md shadow-slate-700",
          header: "bg-blue-200 text-blue-600",
          button: "border-blue-400 text-blue-600",
          imageContainer: "border-blue-400 border-b-transparent",
          ponente: "border-b-blue-200 border-x-blue-200 border-t-transparent",
          content:"border-transparent"
        }}
        dayButtonStyles={{
          default: "bg-blue-600 text-white",
          selected: "bg-[#F2AE30] text-black",
          hover: "hover:bg-yellow-300 hover:text-purple-800",
        }}
        titleStyles="hidden"
      />
    </div>
  );
}
