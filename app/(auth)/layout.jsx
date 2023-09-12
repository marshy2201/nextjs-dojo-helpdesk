import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <>
      <nav>
        <h1>Dojo Helpdesk</h1>
        <Link href="/login">Log in</Link>
        <Link href="/signup">Sign Up</Link>
      </nav>
      {children}
    </>
  )
}
