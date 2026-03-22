interface LogoMarkProps {
  size?: number;
}

export default function LogoMark({ size = 34 }: LogoMarkProps) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width:      size,
        height:     size,
        background: "linear-gradient(135deg, #00C2FF, #0066FF)",
        borderRadius: Math.round(size * 0.26),
        boxShadow:  "0 0 20px rgba(0,102,255,0.3)",
      }}
    >
      <svg
        width={size * 0.53}
        height={size * 0.53}
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M3 9L7 13L15 5"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
