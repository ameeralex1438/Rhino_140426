import { cn } from "@/lib/utils";

export function RhinoLogo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logos/rhino-main-logo.svg"
      alt="Rhino Rock Mineral Wool"
      className={cn(
        "h-10 w-auto",
        variant === "light" && "brightness-0 invert",
        className,
      )}
    />
  );
}

export function RhinoLogoMark({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logos/rhino-main-logo.svg"
      alt=""
      aria-hidden="true"
      className={className}
      width={size}
      height={size * (40 / 48)}
      style={{ width: size, height: "auto" }}
    />
  );
}
