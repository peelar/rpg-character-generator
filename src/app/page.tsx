import { GenerateForm } from "../GenerateForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-evenly h-screen">
      <header className="flex justify-center items-center h-[10vh]">
        <h1 className="font-black text-stone-900 text-5xl">
          Fantasy Characters Generator
        </h1>
      </header>
      <main className="h-[40vh]">
        <GenerateForm />
      </main>
    </div>
  );
}
