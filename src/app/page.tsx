
import SignIn from "../components/SignIn";

export default function Home() {
  return (
    <main className="w-full">
      <SignIn provider="github" />
      <SignIn provider="google" />
    </main>
  );
}
