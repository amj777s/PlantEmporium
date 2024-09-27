import Image from "next/image";
import SignIn from "../components/SignIn";

export default function Home() {
  return (
    <main className="">
      <SignIn provider="github" />
      <SignIn provider="google" />
    </main>
  );
}
