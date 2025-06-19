import Link from "next/link";

export function Metrics() {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-8 lg:absolute bottom-0 left-0 md:divide-x mt-20 lg:mt-0">
      <Link href="/stats">
        <div className="flex flex-col md:pr-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Total Prompts</h4>
          <span className="text-2xl font-mono font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">10,200+</span>
        </div>
      </Link>
      <Link href="/stats">
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Active Users</h4>
          <span className="text-2xl font-mono font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">5,800+</span>
        </div>
      </Link>
      <Link href="/stats">
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">AI Models</h4>
          <span className="text-2xl font-mono font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">50+</span>
        </div>
      </Link>
      <Link href="/stats">
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Prompt Forks</h4>
          <span className="text-2xl font-mono font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">25K+</span>
        </div>
      </Link>
    </div>
  );
}