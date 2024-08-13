import { FormContact } from "@/components/FormContact";

export default function Home() {
  return (
    <main className="container mx-auto flex items-center h-screen justify-center">
      <div className="flex justify-center items-center border-2 rounded-md p-10">
        <FormContact />
      </div>
    </main>
  );
}
