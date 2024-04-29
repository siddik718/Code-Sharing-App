import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-2xl font-mono font-medium">
        <span className="text-red-500 mr-4">
          404
        </span>
        | Sorry reqested resource is not available yet.
        <Link href="/" className="ml-4 bg-green-500 p-1 rounded underline ">Go To Home</Link>
      </p>
    </div>
  )
}
