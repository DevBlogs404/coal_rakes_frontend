import AuthForm from "../components/AuthForm";

export default function page() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">Sign-In Form</h1>
      <AuthForm isSignIn={true} />
    </div>
  );
}
