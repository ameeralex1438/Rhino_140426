import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("w-full", className)}>
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-20">
        {children}
      </div>
    </section>
  );
}
