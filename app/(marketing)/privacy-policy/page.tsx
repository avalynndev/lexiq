import { siteConfig } from "@/config/site";

export default function PrivacyPolicy() {
  return (
    <div>
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last updated: June 2025</p>
        <p className="mb-4">
          At {siteConfig.name}, accessible at {siteConfig.url}, your privacy is
          a top priority. This Privacy Policy describes how we collect, use, and
          protect your information when you use our platform.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">
          Information We Collect
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Account information (such as email, username, and profile data)
          </li>
          <li>Usage data (such as prompts you create, remix, or star)</li>
          <li>
            Technical data (such as IP address, browser type, and device
            information)
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">
          How We Use Your Information
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>To provide and improve our services</li>
          <li>To personalize your experience</li>
          <li>To ensure security and prevent abuse</li>
          <li>To communicate important updates</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Data Security</h2>
        <p className="mb-4">
          Your data is protected with enterprise-grade security. Prompts remain
          private by default until you choose to share them. We use
          industry-standard measures to safeguard your information.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">
          Personalization & Transparency
        </h2>
        <p className="mb-4">
          We only use data you have consented to share. You have control over
          your data and can view, edit, or delete your information at any time.
          We are transparent about how personalization works and what data is
          used.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Your Rights</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Access, update, or delete your personal data</li>
          <li>Opt out of personalization features</li>
          <li>Request information about how your data is used</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Contact</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a href="mailto:support@lexiq.com" className="underline">
            support@lexiq.com
          </a>
          .
        </p>
      </main>
    </div>
  );
}
