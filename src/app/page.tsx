import { signIn } from "../../auth";

export default function Home() {
  return (
    <>
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      >
      <button type="submit">Signin with Google</button>
    </form>
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
      >
      <button type="submit">Signin with github</button>
    </form>
      </>
  );
}
