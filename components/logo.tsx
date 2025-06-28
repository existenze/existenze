import type { FC } from "react"

interface LogoProps {
  className?: string
  size?: "small" | "medium" | "large"
}

export const Logo: FC<LogoProps> = ({ className = "", size = "medium" }) => {
  // Size mapping
  const sizeMap = {
    small: { width: 120, height: 40 },
    medium: { width: 180, height: 60 },
    large: { width: 240, height: 80 },
  }

  const { width, height } = sizeMap[size]

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className="vintage-border bg-card p-1"
        style={{
          width: width,
          height: height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <div className="vintage-title text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">SECOND COURSE</div>
        </div>
      </div>
    </div>
  )
}
