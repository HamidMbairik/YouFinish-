import { motion } from "framer-motion";

export default function Logo({ size = 64, animated = true }) {
  const s = size;

  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      style={{ width: s, height: s }}
      animate={
        animated
          ? {
              rotate: [0, 3, -3, 5, -5, 2, -2, 0],
              scale: [1, 1.05, 0.95, 1.08, 0.92, 1],
            }
          : {}
      }
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width={s}
        height={s}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        <motion.g
          animate={
            animated
              ? { d: [
                  "M20 45 C15 25 30 15 40 18 C50 15 65 25 60 45 C65 55 55 70 40 68 C25 70 15 55 20 45Z",
                  "M18 43 C13 28 32 12 40 16 C48 12 67 28 62 43 C67 53 57 72 40 70 C23 72 13 53 18 43Z",
                  "M22 47 C17 22 28 17 40 20 C52 17 63 22 58 47 C63 57 53 68 40 66 C27 68 17 57 22 47Z",
                  "M20 45 C15 25 30 15 40 18 C50 15 65 25 60 45 C65 55 55 70 40 68 C25 70 15 55 20 45Z",
                ]}
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M20 45 C15 25 30 15 40 18 C50 15 65 25 60 45 C65 55 55 70 40 68 C25 70 15 55 20 45Z"
            fill="url(#lg)"
            stroke="white"
            strokeWidth="2"
            filter="drop-shadow(0 0 12px rgba(236, 72, 153, 0.5))"
          />
        </motion.g>

        {[...Array(3)].map((_, i) => (
          <motion.rect
            key={`spike-${i}`}
            x={22 + i * 14}
            y={8 + (i % 2) * 4}
            width="5"
            height="10"
            rx="2"
            fill="url(#lg)"
            animate={
              animated
                ? {
                    y: [8 + (i % 2) * 4, 3 + (i % 2) * 4, 8 + (i % 2) * 4],
                    rotate: [0, i % 2 === 0 ? 8 : -8, 0],
                    opacity: [0.8, 1, 0.8],
                  }
                : {}
            }
            transition={{ duration: 0.6 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <motion.circle
          cx="30"
          cy="35"
          r="5"
          fill="white"
          animate={animated ? { scale: [1, 1.2, 1], x: [0, -2, 2, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="50"
          cy="35"
          r="6"
          fill="white"
          animate={animated ? { scale: [1, 1.3, 1], x: [0, 2, -2, 0] } : {}}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="30"
          cy="35"
          r="2.5"
          fill="#1e1b4b"
          animate={animated ? { scale: [1, 0.5, 1], x: [0, -1, 0] } : {}}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="50"
          cy="35"
          r="3"
          fill="#1e1b4b"
          animate={animated ? { scale: [1, 0.3, 1], x: [0, 1, 0] } : {}}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M30 55 C35 50 45 50 50 55"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={animated ? { d: [
            "M30 55 C35 50 45 50 50 55",
            "M30 58 C35 53 45 48 50 56",
            "M30 52 C35 55 45 48 50 57",
            "M30 55 C35 50 45 50 50 55",
          ]} : {}}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
