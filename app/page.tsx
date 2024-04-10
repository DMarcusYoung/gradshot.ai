import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-zinc-900 w-full p-24">
        <h1 className="text-5xl font-bold p-6">Gradshot.ai</h1>
        <p className="text-xl">
          Graduation photos without the photoshoot
        </p>
        <Link className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 mt-6 rounded" href='/create'>
          Get Started
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full text-zinc-900 p-20">
        <h3 className="text-2xl font-bold">How It Works</h3>
        <div className="flex flex-col items-center justify-center w-full p-50">
          <div className="flex flex-col items-center justify-center w-full p-10">
            <p className="text-lg p-6">1. Upload a few pictures of yourself</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full p-10">
            <p className="text-lg p-6">2. Let our AI create the photos</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full p-10">
            <p className="text-lg p-6">3. Download your photos!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
