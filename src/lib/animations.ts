export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease: EASE_OUT_EXPO },
};

export function fadeInUpDelay(delay: number) {
  return {
    ...fadeInUp,
    transition: { ...fadeInUp.transition, delay },
  };
}
