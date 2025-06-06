import { ArrowRight } from "lucide-react"
export const LoginButton = ({children}: {children: React.ReactNode})=>{
    return(
      <button className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full  cursor-pointer items-center justify-center rounded-md bg-black px-10  text-sm font-medium text-white backdrop-blur-3xl">
          <span className="mb-[3px]">{children}</span><ArrowRight className="ml-1 h-[15px]"/>
        </span>
      </button>
    )
}