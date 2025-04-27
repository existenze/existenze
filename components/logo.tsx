import type { FC } from "react"

interface LogoProps {
  className?: string
  size?: "small" | "medium" | "large"
}

export const Logo: FC<LogoProps> = ({ className = "", size = "medium" }) => {
  // Size mapping
  const sizeMap = {
    small: { width: 24, height: 24 },
    medium: { width: 32, height: 32 },
    large: { width: 48, height: 48 },
  }

  const { width, height } = sizeMap[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Plate circle */}
        <circle cx="24" cy="24" r="22" fill="white" stroke="currentColor" strokeWidth="2" />

        {/* Graduation cap - updated to use pastel pink */}
        <path d="M14 20L24 16L34 20L24 24L14 20Z" fill="#f591b2" className="text-primary" />
        <path d="M29 22V28" stroke="#f591b2" strokeWidth="2" className="text-primary" />

        {/* Fork - updated to use pastel purple */}
        <path d="M20 24V36" stroke="#c5a3ff" strokeWidth="2" />
        <path d="M20 24C20 21 20 18 20 16C22 16 24 18 24 20C24 22 22 24 20 24Z" fill="#c5a3ff" />
      </svg>
      <div className="font-bold">
        <span className="text-primary">Second</span>
        <span>Course</span>
      </div>
    </div>
  )
}
