import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing the use of the Rhino Rock Mineral Wool website and products by Sarda Metals & Alloys Ltd.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111] px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44 xl:px-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rhino-orange/5 to-transparent" />
        <div className="relative mx-auto max-w-[1440px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-rhino-orange"
          >
            &larr; Back to Home
          </Link>
          <h1 className="mt-6 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 font-mono text-sm text-white/40">
            Effective Date: March 4, 2026 &middot; Version 1.0
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-[900px] px-6 py-16 md:px-12 md:py-24">
        <div className="space-y-10 text-base leading-[1.8] text-[#444]">
          {/* 1 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website located at{" "}
              <a href="https://www.rhinoinsulation.in" className="text-rhino-orange hover:underline">
                rhinoinsulation.in
              </a>{" "}
              (the &ldquo;Website&rdquo;), you accept and agree to be bound by these Terms and Conditions
              (&ldquo;Terms&rdquo;). These Terms constitute a legally binding agreement between you
              (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and Sarda Metals &amp; Alloys Ltd.
              (CIN: L27100AP1984PLC004542), operating under the brand name &ldquo;Rhino Rock Mineral Wool&rdquo;
              (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
            </p>
            <p className="mt-3">
              These Terms apply to all visitors, users, dealers, distributors, contractors, engineers, and any other
              persons who access or use the Website and the products and services offered by the Company. If you do
              not agree to these Terms in their entirety, you must discontinue use of the Website immediately.
            </p>
            <p className="mt-3">
              These Terms are governed by and shall be interpreted in accordance with the{" "}
              <strong>Indian Contract Act, 1872</strong>, the{" "}
              <strong>Information Technology Act, 2000</strong>, the{" "}
              <strong>Consumer Protection Act, 2019</strong>, and other applicable Indian laws.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">2. Description of Products &amp; Services</h2>
            <p>
              Sarda Metals &amp; Alloys Ltd. manufactures and supplies Rhino Rock Mineral Wool insulation products at
              its APIIC Industrial Park facility in Kantakapalli, Kothavalasa, Vizianagaram, Andhra Pradesh.
              Products include:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[#555]">
              <li>
                <strong>Rhino Slabs (RSL)</strong> &mdash; Precision-cut rigid insulation boards for industrial and
                commercial applications
              </li>
              <li>
                <strong>Rhino Wired Matts (RWM)</strong> &mdash; Flexible wired insulation matts for high-vibration
                and curved surface applications
              </li>
              <li>
                <strong>Rhino Building Rolls (RBR)</strong> &mdash; Lightweight building insulation rolls for
                residential and commercial construction
              </li>
              <li>
                <strong>Rhino RockArmor (RRA)</strong> &mdash; High-density pipe and surface insulation for extreme
                service conditions
              </li>
              <li>
                <strong>Rhino Loose Wool (RLW)</strong> &mdash; Blow-in and fill insulation for irregular cavities
                and retrofit applications
              </li>
            </ul>
            <p className="mt-3">
              Available in three variants &mdash; <strong>Elite</strong>, <strong>Enduro</strong>, and{" "}
              <strong>Eco-Green</strong> &mdash; each manufactured using India&apos;s first Electric Arc Furnace
              technology with zero fossil fuel combustion.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              3. Product Information &amp; Specifications
            </h2>
            <p>
              Product specifications, technical data, performance claims, and testing results published on this
              Website are provided for general reference and preliminary evaluation purposes only. While we exercise
              reasonable care to ensure accuracy, the Company makes no warranty or representation that such
              information is complete, current, or error-free.
            </p>
            <p className="mt-3 rounded-lg border-l-4 border-rhino-orange bg-rhino-orange/5 p-4 font-medium text-[#333]">
              Actual product performance may vary depending on installation conditions, environmental factors,
              substrate properties, thickness specifications, and application specifics. For project-critical
              specifications, users must request formal technical data sheets (TDS), material safety data sheets
              (MSDS), and test certificates from our engineering team prior to specification or procurement.
            </p>
            <p className="mt-3">
              All performance values are derived from testing conducted at our NaBL-accredited in-house laboratory
              (Certificate No. TC-12249) and/or independent third-party laboratories in accordance with BIS IS
              8183:2024, ASTM C612, ASTM C592, ASTM E84, and ASTM E136 standards as applicable.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              4. Product Warranty &amp; Disclaimer
            </h2>
            <p>
              Products sold by the Company are warranted to conform to published specifications at the time of
              delivery, subject to the following conditions:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[#555]">
              <li>
                Products must be stored, handled, and installed in accordance with the Company&apos;s published
                installation guidelines and applicable Indian standards
              </li>
              <li>
                Warranty claims must be accompanied by original purchase documentation, batch numbers, and
                photographic evidence of the alleged defect
              </li>
              <li>
                The warranty does not cover damage resulting from improper installation, exposure to conditions
                exceeding published service temperature limits, chemical attack, mechanical abuse, or modification of
                the product
              </li>
              <li>
                Thermal performance warranties (thermal conductivity values) are valid only for the specified density
                range and operating temperature conditions published in the applicable TDS
              </li>
              <li>
                Fire classification ratings (Euroclass A1, A2) are valid only when the product is installed as part
                of a tested and approved system configuration
              </li>
            </ul>
            <p className="mt-4 font-medium text-[#333]">
              EXCEPT AS EXPRESSLY SET FORTH HEREIN, THE COMPANY MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
              BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
              NON-INFRINGEMENT. PRODUCT WARRANTIES AND LIABILITY TERMS FOR PURCHASED PRODUCTS ARE GOVERNED BY THE
              SPECIFIC PURCHASE AGREEMENT AND APPLICABLE PRODUCT WARRANTY DOCUMENTATION.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">5. Intellectual Property</h2>
            <p>
              All content on this Website &mdash; including but not limited to the Rhino brand, logo, product names
              (Elite, Enduro, Eco-Green, RockArmor), trade names, trademarks, service marks, domain names, images,
              text, graphics, photographs, product designs, technical data, software, and source code &mdash; is the
              exclusive property of Sarda Metals &amp; Alloys Ltd. and is protected by the{" "}
              <strong>Trade Marks Act, 1999</strong>, the <strong>Copyright Act, 1957</strong>, the{" "}
              <strong>Patents Act, 1970</strong>, and other applicable intellectual property laws of India.
            </p>
            <p className="mt-3">
              Unauthorized reproduction, distribution, modification, public display, transmission, reverse
              engineering, or commercial exploitation of any content is strictly prohibited and may result in civil
              and criminal liability. Limited permission is granted to download and print content solely for
              personal, non-commercial, informational purposes, provided all copyright and proprietary notices are
              retained.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">6. Use of Online Tools</h2>
            <p>
              The Product Selector, Thermal Calculator, Product Comparison, and other interactive tools available on
              this Website are provided for preliminary guidance and estimation purposes only. These tools are
              intended to assist engineers, consultants, and end-users in initial product evaluation.
            </p>
            <p className="mt-3 font-medium text-[#333]">
              Tool outputs do not constitute engineering recommendations, professional advice, or product guarantees.
              All results must be independently verified by qualified engineers, consultants, or insulation
              specialists before use in project specifications, tenders, or procurement decisions. The Company
              expressly disclaims any liability for decisions made based solely on tool outputs.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              7. Compliance with Standards &amp; Regulations
            </h2>
            <p className="mb-3">
              Rhino products are manufactured in compliance with the following national and international standards:
            </p>
            <ul className="list-disc space-y-1.5 pl-6 text-[#555]">
              <li>
                <strong>BIS IS 8183:2024</strong> &mdash; Bonded Mineral Wool (Bureau of Indian Standards)
              </li>
              <li>
                <strong>ASTM C612</strong> &mdash; Standard Specification for Mineral Fiber Block and Board Thermal
                Insulation
              </li>
              <li>
                <strong>ASTM C592</strong> &mdash; Standard Specification for Mineral Fiber Blanket Insulation
              </li>
              <li>
                <strong>ASTM E84</strong> &mdash; Standard Test Method for Surface Burning Characteristics
              </li>
              <li>
                <strong>ASTM E136</strong> &mdash; Standard Test Method for Assessing Combustibility of Materials
              </li>
            </ul>
            <p className="mt-3">
              Claims regarding BIS certification, NaBL accreditation, ISO certifications, and other regulatory
              compliance are subject to the validity period of the respective certificates. Users may request current
              certificates and test reports from our sales team.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">8. Confidentiality</h2>
            <p>
              Any confidential or proprietary information exchanged between parties during business engagements,
              including but not limited to project specifications, pricing structures, technical requirements,
              customization details, volume commitments, and commercial terms, shall be held in strict confidence by
              the receiving party. Such information shall not be disclosed, published, or disseminated to any third
              party without the prior written consent of the disclosing party, except as required by applicable law
              or court order.
            </p>
            <p className="mt-3">
              This confidentiality obligation shall survive the termination of any business relationship for a
              period of <strong>3 (three) years</strong>.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              9. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SARDA METALS &amp; ALLOYS LTD. AND ITS DIRECTORS,
              OFFICERS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS,
              REVENUE, DATA, GOODWILL, BUSINESS OPPORTUNITY, OR ANTICIPATED SAVINGS, ARISING FROM OR IN CONNECTION
              WITH:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[#555]">
              <li>Use of or inability to use this Website or its content</li>
              <li>Reliance on any information, specifications, or data provided on this Website</li>
              <li>Use of interactive tools, calculators, or product selectors</li>
              <li>Any interruption, suspension, or termination of Website access</li>
              <li>Any unauthorized access to or alteration of your data or transmissions</li>
            </ul>
            <p className="mt-4 font-medium text-[#333]">
              In no event shall the Company&apos;s total aggregate liability exceed the amount actually paid by you
              to the Company for products in the 12 months preceding the claim, or INR 1,00,000 (Rupees One Lakh),
              whichever is lower.
            </p>
            <p className="mt-3">
              Product-specific liability and warranty terms for purchased products are governed exclusively by the
              applicable purchase agreement, quotation terms, and product warranty documentation.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Sarda Metals &amp; Alloys Ltd., its directors,
              officers, employees, agents, and affiliates from and against any and all claims, damages, losses,
              liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising from or related
              to:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[#555]">
              <li>Your use of the Website in violation of these Terms</li>
              <li>Your violation of any applicable law or regulation</li>
              <li>Your infringement of any intellectual property or other rights of any third party</li>
              <li>Any misrepresentation made by you in connection with your use of the Website or our services</li>
            </ul>
          </div>

          {/* 11 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">11. Payment Terms</h2>
            <p>
              Payment terms for product purchases are as specified in individual quotations, purchase orders, and
              sales agreements. Unless otherwise stated in writing:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[#555]">
              <li>All prices are quoted in Indian Rupees (INR) and are exclusive of GST and other applicable taxes</li>
              <li>Payment is due as per the terms specified in the accepted quotation or purchase order</li>
              <li>
                Late payments shall attract interest at the rate of 18% per annum or the maximum rate permitted by
                law, whichever is lower
              </li>
              <li>
                The Company reserves the right to withhold delivery or suspend services for overdue accounts
              </li>
            </ul>
            <p className="mt-3">
              Detailed payment terms, credit periods, and trade discounts are provided in formal quotations and are
              subject to credit approval.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">12. Force Majeure</h2>
            <p>
              Neither party shall be liable for any failure or delay in the performance of its obligations under
              these Terms (except payment obligations) to the extent that such failure or delay results from
              circumstances beyond its reasonable control, including but not limited to:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[#555]">
              <li>Natural disasters (earthquakes, floods, cyclones, tsunamis)</li>
              <li>Epidemics, pandemics, or quarantine restrictions</li>
              <li>War, armed conflict, terrorism, civil unrest, or sanctions</li>
              <li>Government actions, embargoes, import/export restrictions, or regulatory changes</li>
              <li>Strikes, lockouts, or industrial disputes (except those involving the affected party&apos;s employees)</li>
              <li>Failure of power supply, telecommunications, or internet infrastructure</li>
              <li>Fire, explosion, or equipment failure at manufacturing facilities</li>
              <li>Raw material shortages or supply chain disruptions beyond reasonable control</li>
            </ul>
            <p className="mt-3">
              The affected party shall notify the other party in writing within <strong>7 (seven) business
              days</strong> of becoming aware of the force majeure event and shall use reasonable efforts to mitigate
              its impact. If the force majeure event continues for more than <strong>90 (ninety) consecutive
              days</strong>, either party may terminate the affected obligations by written notice.
            </p>
          </div>

          {/* 13 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">13. Links to Third-Party Websites</h2>
            <p>
              Our Website may contain hyperlinks to third-party websites that are not owned, operated, or controlled
              by the Company. We are not responsible for the content, privacy practices, security, terms of service,
              or accuracy of information on any linked third-party websites. Inclusion of any link does not imply
              endorsement, recommendation, or affiliation. You access third-party websites entirely at your own risk.
            </p>
          </div>

          {/* 14 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              14. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of India, without regard to
              conflict of law principles.
            </p>
            <p className="mt-3">
              <strong>Dispute Resolution:</strong> Any dispute, controversy, or claim arising out of or in
              connection with these Terms, or the breach, termination, or invalidity thereof, shall be resolved as
              follows:
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-[#555]">
              <li>
                <strong>Negotiation:</strong> The parties shall first attempt to resolve the dispute through
                good-faith negotiation within <strong>30 (thirty) days</strong> of written notice of the dispute.
              </li>
              <li>
                <strong>Mediation:</strong> If negotiation fails, the parties shall attempt mediation under the
                rules of the Indian Institute of Arbitration &amp; Mediation (IIAM) or a mutually agreed mediator.
              </li>
              <li>
                <strong>Arbitration:</strong> If mediation fails, the dispute shall be finally resolved by binding
                arbitration under the <strong>Arbitration and Conciliation Act, 1996</strong> (as amended). The
                arbitration shall be conducted by a sole arbitrator mutually appointed by the parties, or failing
                agreement, appointed in accordance with the Act. The seat of arbitration shall be{" "}
                <strong>Mumbai, Maharashtra, India</strong>. The language of arbitration shall be English. The
                arbitrator&apos;s award shall be final and binding.
              </li>
            </ol>
            <p className="mt-3">
              <strong>Jurisdiction:</strong> Subject to the arbitration clause above, the courts of Mumbai,
              Maharashtra, India shall have exclusive jurisdiction over any proceedings arising out of or in
              connection with these Terms.
            </p>
          </div>

          {/* 15 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">15. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of
              competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it
              valid, legal, and enforceable, or if modification is not possible, shall be severed from these Terms.
              The remaining provisions shall continue in full force and effect and shall not be affected, impaired,
              or invalidated.
            </p>
          </div>

          {/* 16 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">16. Entire Agreement</h2>
            <p>
              These Terms, together with our{" "}
              <Link href="/privacy" className="text-rhino-orange hover:underline">
                Privacy Policy
              </Link>
              , constitute the entire agreement between you and the Company with respect to your use of the Website
              and supersede all prior or contemporaneous communications, representations, or agreements, whether oral
              or written, relating to the subject matter hereof.
            </p>
            <p className="mt-3">
              For avoidance of doubt, these Terms govern Website use only. Product purchases, dealer agreements, and
              commercial relationships are governed by separate written agreements executed between the parties.
            </p>
          </div>

          {/* 17 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">17. Waiver</h2>
            <p>
              No failure or delay by the Company in exercising any right, power, or remedy under these Terms shall
              operate as a waiver thereof, nor shall any single or partial exercise of any right, power, or remedy
              preclude any other or further exercise thereof or the exercise of any other right, power, or remedy.
            </p>
          </div>

          {/* 18 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">18. Changes to These Terms</h2>
            <p>
              The Company reserves the right to modify, amend, or update these Terms at any time without prior
              notice. The &ldquo;Effective Date&rdquo; at the top of this page indicates the date of the most recent
              revision. Continued use of the Website after any such modifications constitutes your acceptance of the
              revised Terms. We encourage you to review these Terms periodically.
            </p>
          </div>

          {/* Contact Card */}
          <div className="rounded-2xl border border-gray-200/60 bg-white p-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">19. Contact Information</h2>
            <p className="mb-4">
              For any questions or concerns regarding these Terms and Conditions:
            </p>
            <ul className="space-y-2 text-[#444]">
              <li>
                <strong>Company:</strong> Sarda Metals &amp; Alloys Ltd.
              </li>
              <li>
                <strong>CIN:</strong> L27100AP1984PLC004542
              </li>
              <li>
                <strong>Legal inquiries:</strong>{" "}
                <a href="mailto:legal@rhinoinsulation.in" className="text-rhino-orange hover:underline">
                  legal@rhinoinsulation.in
                </a>
              </li>
              <li>
                <strong>General inquiries:</strong>{" "}
                <a href="mailto:sales@rhinoinsulation.in" className="text-rhino-orange hover:underline">
                  sales@rhinoinsulation.in
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+919964674466" className="text-rhino-orange hover:underline">
                  +91 99646 74466
                </a>
              </li>
              <li>
                <strong>Registered Office:</strong> 125, B-Wing, Mittal Court, Nariman Point, Mumbai 400021,
                Maharashtra, India
              </li>
              <li>
                <strong>Manufacturing Works:</strong> APIIC Industrial Park, Kantakapalli, Kothavalasa, Vizianagaram
                535240, Andhra Pradesh, India
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
