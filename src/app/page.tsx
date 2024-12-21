import Cronograma from "@/components/cronograma";
import Carousel from "@/components/ejes_tematicos";
import Ponentes from "@/components/ponentes";
//bg-[101017]
export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[101017]"> 
    <main className="bg-[101017] flex-grow w-full mt-10">
      <div className="flex justify-center">
      <Cronograma></Cronograma>
      </div>
      
      <div className="container mx-auto px-4 py-10">
      <section className="mt-12">
          <div>
          <Carousel></Carousel>
          </div>
        </section>
        <section>
          <div className="flex justify-center mt-[9%]">
          <Ponentes></Ponentes>
          </div>
          <div>
          
          </div>
        </section>
      </div>
    </main>

 
  </div>
  );
}
