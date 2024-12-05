import { SignIn, SignOut } from "./Auth";

export default function Header({ action, user }) {
  return (
    <>
      <header>
        <div onClick={action}></div>
        <div>{user ? <SignOut /> : <SignIn />}</div>
      </header>
      <h1>Riddle Me This</h1>
      <h2>Score--</h2>
    </>
  );
}