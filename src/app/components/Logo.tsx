type LogoProps = {
  className?: string;
  size?: number;
};

// Square brand mark (1:1).
export function Logo({ className = "", size = 44 }: LogoProps) {
  return (
    <img
      src="/logo-mark.png"
      alt="Sunflower Haven"
      width={size}
      height={size}
      className={className}
      style={{ display: "block", width: size, height: size }}
    />
  );
}

type WordmarkProps = {
  className?: string;
  height?: number;
};

// Horizontal lockup — mark + "Sunflower Haven" wordmark.
// Source PNG is 1458×692 (~2.107:1). Height-driven so it scales cleanly.
export function Wordmark({ className = "", height = 48 }: WordmarkProps) {
  return (
    <img
      src="/logo-wordmark.png"
      alt="Sunflower Haven"
      height={height}
      className={className}
      style={{ display: "block", height, width: "auto" }}
    />
  );
}
