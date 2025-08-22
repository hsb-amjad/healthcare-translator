import Translator from "../components/Translator";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Healthcare Translator Prototype
      </h1>
      <Translator />
    </main>
  );
}
