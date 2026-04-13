import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Rhino Rock Mineral Wool by Sarda Metals & Alloys Ltd. Compliant with the Digital Personal Data Protection Act, 2023.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-sm text-white/40">
            Last updated: March 4, 2026 &middot; Effective: March 4, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-[900px] px-6 py-16 md:px-12 md:py-24">
        <div className="space-y-10 text-base leading-[1.8] text-[#444]">
          {/* 1 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">1. Introduction</h2>
            <p>
              Sarda Metals &amp; Alloys Ltd. (CIN: L27100AP1984PLC004542), operating under the brand name
              &ldquo;Rhino Rock Mineral Wool&rdquo; (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
              &ldquo;us&rdquo;), is committed to protecting the privacy and personal data of all individuals who
              visit our website at{" "}
              <a href="https://www.rhinoinsulation.in" className="text-rhino-orange hover:underline">
                www.rhinoinsulation.in
              </a>{" "}
              (the &ldquo;Website&rdquo;) and who use our products and services.
            </p>
            <p className="mt-3">
              This Privacy Policy is published in compliance with the <strong>Information Technology Act, 2000</strong>{" "}
              and the rules made thereunder, the{" "}
              <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data
              or Information) Rules, 2011</strong>, and the{" "}
              <strong>Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;)</strong> as applicable. It
              explains how we collect, use, store, disclose, and safeguard your information when you access our
              Website, submit inquiries, request quotations, or engage with our services.
            </p>
            <p className="mt-3">
              By accessing or using our Website, you acknowledge that you have read, understood, and agree to be bound
              by this Privacy Policy. If you do not agree with the practices described herein, please discontinue use
              of our Website immediately.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">2. Data Fiduciary Information</h2>
            <p>
              Under the DPDP Act, 2023, Sarda Metals &amp; Alloys Ltd. is the <strong>Data Fiduciary</strong>{" "}
              responsible for processing your personal data. For any questions, concerns, or requests relating to your
              personal data, you may contact our designated officer:
            </p>
            <div className="mt-4 rounded-xl border border-gray-200/60 bg-white p-6">
              <ul className="space-y-1.5 text-[#444]">
                <li>
                  <strong>Data Protection Officer:</strong> Head of Legal &amp; Compliance
                </li>
                <li>
                  <strong>Entity:</strong> Sarda Metals &amp; Alloys Ltd.
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:privacy@rhinoinsulation.in" className="text-rhino-orange hover:underline">
                    privacy@rhinoinsulation.in
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> 125, B-Wing, Mittal Court, Nariman Point, Mumbai 400021, Maharashtra,
                  India
                </li>
              </ul>
            </div>
          </div>

          {/* 3 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">3. Information We Collect</h2>

            <h3 className="mb-2 text-lg font-semibold text-[#222]">
              3.1 Personal Data You Provide Voluntarily
            </h3>
            <p className="mb-2">
              When you submit a contact form, request a quotation, apply as a dealer, or otherwise communicate with
              us, you may provide:
            </p>
            <ul className="list-disc space-y-1.5 pl-6 text-[#555]">
              <li>Full name &mdash; to identify you and personalize communication</li>
              <li>Email address &mdash; to respond to inquiries and deliver requested documentation</li>
              <li>Phone number &mdash; to contact you regarding your inquiry or project requirements</li>
              <li>Company name and designation &mdash; to understand your business context and authority</li>
              <li>City, state, and project details &mdash; to provide relevant product and logistics recommendations</li>
              <li>GST Identification Number (GSTIN) &mdash; for dealer applications and commercial transactions</li>
              <li>Message content &mdash; the details you provide in inquiry, contact, or quote request forms</li>
            </ul>

            <h3 className="mb-2 mt-6 text-lg font-semibold text-[#222]">
              3.2 Information Collected Automatically
            </h3>
            <p className="mb-2">
              When you access our Website, we may automatically collect certain technical information through cookies,
              server logs, and analytics tools:
            </p>
            <ul className="list-disc space-y-1.5 pl-6 text-[#555]">
              <li>IP address (anonymized where technically feasible)</li>
              <li>Browser type, version, and language preferences</li>
              <li>Operating system and device type</li>
              <li>Pages visited, time spent on each page, and navigation path</li>
              <li>Referring URL or traffic source</li>
              <li>Screen resolution and viewport dimensions</li>
              <li>Geographic location at the country and region level (derived from IP)</li>
              <li>Date and time of access</li>
            </ul>

            <h3 className="mb-2 mt-6 text-lg font-semibold text-[#222]">
              3.3 Sensitive Personal Data
            </h3>
            <p>
              We do not intentionally collect sensitive personal data as defined under the IT (SPDI) Rules, 2011, such
              as financial information (bank accounts, credit/debit card details), biometric data, health records, or
              passwords. If such data is inadvertently received, it will be deleted promptly and not processed for any
              purpose.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              4. Legal Basis for Processing
            </h2>
            <p className="mb-3">
              We process your personal data only when we have a lawful basis to do so. Under the DPDP Act, 2023 and
              applicable Indian law, our processing is based on:
            </p>
            <ul className="list-disc space-y-1.5 pl-6 text-[#555]">
              <li>
                <strong>Consent:</strong> Where you have given clear, informed consent for a specific purpose (e.g.,
                submitting a contact form, opting into newsletters)
              </li>
              <li>
                <strong>Contractual necessity:</strong> Where processing is necessary to fulfill a contract or
                pre-contractual obligation (e.g., processing a dealer application, responding to a quotation request)
              </li>
              <li>
                <strong>Legitimate interest:</strong> Where processing is necessary for our legitimate business
                interests, provided such interests are not overridden by your rights (e.g., website analytics,
                security monitoring, service improvement)
              </li>
              <li>
                <strong>Legal obligation:</strong> Where processing is required to comply with applicable Indian law,
                regulatory requirements, or court orders
              </li>
            </ul>
          </div>

          {/* 5 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              5. Purpose of Data Processing
            </h2>
            <p className="mb-3">We use your personal data for the following purposes:</p>
            <ul className="list-disc space-y-1.5 pl-6 text-[#555]">
              <li>Responding to product inquiries, quotation requests, and technical queries</li>
              <li>Processing dealer and distributor applications</li>
              <li>Providing product specifications, technical data sheets, and compliance documentation</li>
              <li>Facilitating order processing, logistics coordination, and delivery</li>
              <li>Sending product updates, newsletters, and marketing communications (only with explicit opt-in consent)</li>
              <li>Improving website functionality, user experience, and content relevance through analytics</li>
              <li>Ensuring website security, preventing fraud, and maintaining system integrity</li>
              <li>Complying with legal, regulatory, and tax obligations under Indian law</li>
              <li>Enforcing our Terms &amp; Conditions and resolving disputes</li>
            </ul>
            <p className="mt-4 rounded-lg border-l-4 border-rhino-orange bg-rhino-orange/5 p-4 font-medium text-[#333]">
              We do not sell, rent, lease, or trade your personal data to any third party for marketing or commercial
              purposes under any circumstances.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="mb-3">Our Website uses the following categories of cookies and tracking technologies:</p>

            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200/60 bg-white p-4">
                <h4 className="font-semibold text-[#222]">Strictly Necessary Cookies</h4>
                <p className="mt-1 text-sm text-[#555]">
                  Essential for website functionality. Cannot be disabled. Include session management and security
                  tokens.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200/60 bg-white p-4">
                <h4 className="font-semibold text-[#222]">Analytics Cookies (Google Analytics 4)</h4>
                <p className="mt-1 text-sm text-[#555]">
                  Collect anonymized visitor and session data including page views, session duration, bounce rate,
                  traffic sources, and aggregated demographics. Data is processed by Google LLC under their{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rhino-orange hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
              <div className="rounded-lg border border-gray-200/60 bg-white p-4">
                <h4 className="font-semibold text-[#222]">Performance Cookies</h4>
                <p className="mt-1 text-sm text-[#555]">
                  Used for CDN optimization (Google Fonts, image delivery) and website performance monitoring.
                </p>
              </div>
            </div>

            <p className="mt-4">
              You can manage cookie preferences through your browser settings. Most browsers allow you to refuse
              cookies, delete existing cookies, or set alerts before cookies are placed. Note that disabling cookies
              may affect Website functionality. You may also opt out of Google Analytics tracking by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rhino-orange hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              7. Third-Party Service Providers
            </h2>
            <p className="mb-3">
              We engage the following third-party service providers who may process limited personal data on our
              behalf:
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200/60">
              <table className="w-full text-sm">
                <thead className="bg-[#f5f5f5]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#333]">Service</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#333]">Provider</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#333]">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 text-[#444]">Analytics</td>
                    <td className="px-4 py-3 text-[#444]">Google LLC</td>
                    <td className="px-4 py-3 text-[#555]">Website traffic analysis and user behavior insights</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#444]">Search Console</td>
                    <td className="px-4 py-3 text-[#444]">Google LLC</td>
                    <td className="px-4 py-3 text-[#555]">Search performance monitoring and indexing</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#444]">CDN / Fonts</td>
                    <td className="px-4 py-3 text-[#444]">Google LLC / Vercel Inc.</td>
                    <td className="px-4 py-3 text-[#555]">Content delivery, font hosting, performance optimization</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#444]">Hosting</td>
                    <td className="px-4 py-3 text-[#444]">Vercel Inc.</td>
                    <td className="px-4 py-3 text-[#555]">Website hosting and serverless deployment</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-[#666]">
              All third-party service providers are contractually obligated to process personal data only for the
              specified purposes and in accordance with applicable data protection laws.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              8. Cross-Border Data Transfers
            </h2>
            <p>
              Certain third-party services (Google Analytics, Google Fonts, Vercel hosting) may process or store data
              on servers located outside India, including in the United States. Where personal data is transferred
              outside India, we ensure that such transfers comply with the provisions of the DPDP Act, 2023 and are
              made only to jurisdictions or entities that provide an adequate level of data protection, or under
              appropriate contractual safeguards including Standard Contractual Clauses (SCCs) where applicable.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">9. Data Security</h2>
            <p className="mb-3">
              We implement appropriate technical and organizational security measures commensurate with the nature and
              sensitivity of personal data processed, including:
            </p>
            <ul className="list-disc space-y-1.5 pl-6 text-[#555]">
              <li>
                <strong>Encryption:</strong> SSL/TLS encryption (minimum TLS 1.2) for all data in transit
              </li>
              <li>
                <strong>Access control:</strong> Role-based access controls with the principle of least privilege;
                access to personal data is restricted to authorized personnel on a need-to-know basis
              </li>
              <li>
                <strong>Secure infrastructure:</strong> Hosted on enterprise-grade platforms with SOC 2 Type II
                compliance
              </li>
              <li>
                <strong>Form security:</strong> All form submissions are transmitted over encrypted channels and
                stored in access-controlled systems
              </li>
              <li>
                <strong>Monitoring:</strong> Continuous security monitoring, vulnerability scanning, and incident
                response procedures
              </li>
              <li>
                <strong>Internal policies:</strong> Regular review and updating of security practices aligned with
                ISO 27001 principles
              </li>
            </ul>
            <p className="mt-3">
              Notwithstanding the above, no method of transmission over the Internet or method of electronic storage
              is 100% secure. While we strive to protect your personal data, we cannot guarantee absolute security.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">10. Data Retention</h2>
            <p className="mb-3">
              We retain personal data only for as long as necessary to fulfill the purposes for which it was
              collected, or as required by applicable law:
            </p>
            <ul className="list-disc space-y-1.5 pl-6 text-[#555]">
              <li>
                <strong>Contact form submissions:</strong> Retained for the duration of the business relationship plus
                3 years, or until you request deletion, whichever is earlier
              </li>
              <li>
                <strong>Dealer applications:</strong> Retained for the duration of the dealer relationship plus 7
                years for regulatory and tax compliance
              </li>
              <li>
                <strong>Analytics data:</strong> Retained in anonymized/aggregated form for up to 26 months (per
                Google Analytics default retention settings)
              </li>
              <li>
                <strong>Server logs:</strong> Retained for up to 90 days for security and debugging purposes
              </li>
              <li>
                <strong>Marketing communications:</strong> Until you withdraw consent or unsubscribe
              </li>
            </ul>
            <p className="mt-3">
              Upon expiration of the retention period, personal data is securely deleted or irreversibly anonymized.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              11. Your Rights as a Data Principal
            </h2>
            <p className="mb-3">
              Under the DPDP Act, 2023 and applicable Indian law, you have the following rights as a{" "}
              <strong>Data Principal</strong>:
            </p>
            <ul className="list-disc space-y-1.5 pl-6 text-[#555]">
              <li>
                <strong>Right to Access:</strong> Request confirmation of whether your personal data is being
                processed and obtain a summary of such data
              </li>
              <li>
                <strong>Right to Correction:</strong> Request correction or completion of inaccurate or incomplete
                personal data
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your personal data where it is no longer
                necessary for the purpose for which it was collected, subject to legal retention requirements
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw previously given consent at any time; withdrawal
                shall not affect the lawfulness of processing based on consent before its withdrawal
              </li>
              <li>
                <strong>Right to Grievance Redressal:</strong> Lodge a complaint with our Data Protection Officer or
                with the Data Protection Board of India if you believe your rights have been violated
              </li>
              <li>
                <strong>Right to Nominate:</strong> Nominate any other individual to exercise your rights in the event
                of your death or incapacity, as per the DPDP Act
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact our Data Protection Officer at{" "}
              <a href="mailto:privacy@rhinoinsulation.in" className="text-rhino-orange hover:underline">
                privacy@rhinoinsulation.in
              </a>
              . We will respond to your request within <strong>30 days</strong> of receipt. We may request
              verification of your identity before processing your request.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">12. Children&apos;s Privacy</h2>
            <p>
              Our Website and services are not directed to individuals under 18 years of age. We do not knowingly
              collect, process, or store personal data from children. In compliance with the DPDP Act, 2023,
              processing of personal data of children (below 18 years) requires verifiable consent from a parent or
              lawful guardian. If we become aware that personal data of a child has been collected without appropriate
              consent, we will take immediate steps to delete such data.
            </p>
          </div>

          {/* 13 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">
              13. Grievance Redressal Mechanism
            </h2>
            <p>
              In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, if you have any
              grievance, complaint, or concern regarding the processing of your personal data, you may contact our
              Grievance Officer:
            </p>
            <div className="mt-4 rounded-xl border border-gray-200/60 bg-white p-6">
              <ul className="space-y-1.5 text-[#444]">
                <li>
                  <strong>Grievance Officer:</strong> Head of Legal &amp; Compliance
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:grievance@rhinoinsulation.in" className="text-rhino-orange hover:underline">
                    grievance@rhinoinsulation.in
                  </a>
                </li>
                <li>
                  <strong>Response time:</strong> Within 30 days of receipt of the grievance
                </li>
              </ul>
            </div>
            <p className="mt-3">
              If you are not satisfied with our response, you may escalate your complaint to the{" "}
              <strong>Data Protection Board of India</strong> established under the DPDP Act, 2023.
            </p>
          </div>

          {/* 14 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">14. Changes to This Policy</h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time. Any material changes will be
              communicated by updating the &ldquo;Last updated&rdquo; date at the top of this page and, where
              required by law, by providing notice through the Website or via email. Your continued use of the Website
              after such modifications constitutes your acknowledgment and acceptance of the updated Privacy Policy.
              We encourage you to review this page periodically.
            </p>
          </div>

          {/* 15 */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">15. Governing Law</h2>
            <p>
              This Privacy Policy is governed by and construed in accordance with the laws of India, including the
              Information Technology Act, 2000, the IT (SPDI) Rules, 2011, and the Digital Personal Data Protection
              Act, 2023. Any disputes arising under or in connection with this Privacy Policy shall be subject to the
              exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
            </p>
          </div>

          {/* Contact Card */}
          <div className="rounded-2xl border border-gray-200/60 bg-white p-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-[#111]">16. Contact Information</h2>
            <p className="mb-4">
              For any questions, concerns, or requests regarding this Privacy Policy or our data practices:
            </p>
            <ul className="space-y-2 text-[#444]">
              <li>
                <strong>Company:</strong> Sarda Metals &amp; Alloys Ltd.
              </li>
              <li>
                <strong>CIN:</strong> L27100AP1984PLC004542
              </li>
              <li>
                <strong>Privacy inquiries:</strong>{" "}
                <a href="mailto:privacy@rhinoinsulation.in" className="text-rhino-orange hover:underline">
                  privacy@rhinoinsulation.in
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
                <strong>Website:</strong> www.rhinoinsulation.in
              </li>
              <li>
                <strong>Registered Office:</strong> 125, B-Wing, Mittal Court, Nariman Point, Mumbai 400021,
                Maharashtra, India
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
