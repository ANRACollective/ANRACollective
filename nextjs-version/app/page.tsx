import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Book from "@/components/Book";

const Dust = dynamic(() => import("@/components/Dust"));

export default function Home() {
  return (
    <>
      <Dust />
      <Nav />
      <main className="relative z-10">
        <h1 className="sr-only">
          ANRA Collective — a pop-up book portfolio of websites, platforms and campaigns
        </h1>
        <Book />
      </main>
    </>
  );
}
