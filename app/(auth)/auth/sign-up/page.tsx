import AuthForm from "../components/AuthForm";

export default function page() {
  return (
    <div className=" max-w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">Sign-Up Form</h1>
      <AuthForm isSignIn={false} />
    </div>
  );
}
