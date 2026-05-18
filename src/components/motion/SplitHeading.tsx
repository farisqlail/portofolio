import { motion } from "framer-motion";

type SplitHeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  text: string;
  className?: string;
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const word = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export default function SplitHeading({
  as: Tag = "h2",
  text,
  className = "",
}: SplitHeadingProps) {
  const words = text.split(" ");
  const content = words.map((part, index) => (
    <span key={`${part}-${index}`} className="inline-block overflow-hidden align-bottom">
      <motion.span className="inline-block" variants={word}>
        {part}
        {index < words.length - 1 ? "\u00a0" : ""}
      </motion.span>
    </span>
  ));

  const props = {
    className,
    variants: container,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.6 },
    "aria-label": text,
  } as const;

  if (Tag === "h1") return <motion.h1 {...props}>{content}</motion.h1>;
  if (Tag === "h3") return <motion.h3 {...props}>{content}</motion.h3>;
  if (Tag === "h4") return <motion.h4 {...props}>{content}</motion.h4>;
  return <motion.h2 {...props}>{content}</motion.h2>;
}
