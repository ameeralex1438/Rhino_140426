import Image from "next/image";

export function CtaSection() {
  return (
    <section className="w-full" style={{ background: "linear-gradient(to right, var(--color-rhino-orange), #FF8800)" }}>
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32 xl:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* ---- LEFT: Text content (55%) ---- */}
          <div className="flex flex-col lg:w-[55%]">
            {/* Label */}
            <span className="mb-6 block text-xs font-semibold tracking-[0.5em] text-white/80">
              READY TO BUILD GREENER?
            </span>

            {/* Headline */}
            <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              Let&apos;s Start the Revolution
            </h2>

            {/* Subtitle */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
              Join 60+ countries already using India&apos;s greenest rock mineral
              wool. Zero-fossil-fuel manufacturing. World-class performance.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/contact?type=quote"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-base font-semibold text-rhino-orange shadow-lg shadow-black/10 transition-all duration-300 hover:scale-[1.03] hover:bg-gray-50"
              >
                Get a Quote
              </a>
              <a
                href="/contact?type=dealer"
                className="inline-flex items-center justify-center rounded-full border border-white/50 bg-transparent px-10 py-5 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                Become a Dealer
              </a>
              <a
                href="/resources"
                className="inline-flex items-center justify-center rounded-full border border-white/50 bg-transparent px-10 py-5 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                Download Catalog
              </a>
            </div>
          </div>

          {/* ---- RIGHT: Image collage (45%) ---- */}
          <div className="lg:w-[45%]">
            <div className="grid grid-cols-2 gap-3">
              {/* Top — spans full width, large image */}
              <div className="col-span-2 overflow-hidden rounded-2xl">
                <Image
                  src="/images/process/solar-factory.jpg"
                  alt="Solar panel-covered Rhino Insulation factory with mountains"
                  width={640}
                  height={360}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Bottom left */}
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/images/process/green-path.jpg"
                  alt="Green palm-lined pathway at Sarda factory"
                  width={310}
                  height={220}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 22vw"
                />
              </div>

              {/* Bottom right */}
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/images/process/furnace-glow.jpg"
                  alt="Furnace interior with glowing molten material"
                  width={310}
                  height={220}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 22vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
