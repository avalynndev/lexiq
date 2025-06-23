import Link from "next/link";

export function Metrics() {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-8 lg:absolute bottom-0 left-0 md:divide-x mt-20 lg:mt-0">
        <div className="flex flex-col md:pr-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Total Prompts</h4>
          <span className="text-2xl font-mono text-stroke">15,200+</span>
        </div>
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">AI Models</h4>
          <span className="text-2xl font-mono text-stroke">50+</span>
        </div>
        <div className="flex flex-col md:px-8 text-center">
          <h4 className="text-[#878787] text-sm mb-4">Active Users</h4>
          <span className="text-2xl font-mono text-stroke">50,000+</span>
        </div>
    </div>
  );
}
