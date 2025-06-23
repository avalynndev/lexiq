import { siteConfig } from "@/config/site";

export default function TermsConditions() {
  return (
    <div>
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <p className="mb-4">Last updated: June 2025</p>
        <p className="mb-4">
          Welcome to {siteConfig.name}! By accessing or using our platform at{" "}
          {siteConfig.url}, you agree to these Terms & Conditions. Please read
          them carefully.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Use of Service</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>You must be at least 13 years old to use Lexiq.</li>
          <li>
            Do not use Lexiq for unlawful, harmful, or abusive activities.
          </li>
          <li>Respect the rights and privacy of other users.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">
          Content & Ownership
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            You retain ownership of prompts you create, but grant Lexiq a
            license to display and share them as part of the platform.
          </li>
          <li>
            Do not submit content that is illegal, offensive, or infringes on
            others&apos; rights.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Safety & Ethics</h2>
        <p className="mb-4">
          We are committed to ethical and safe use of AI. Avoid prompts that
          could lead to harmful, offensive, or biased outputs. We reserve the
          right to remove content or restrict access that violates these
          principles.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">
          Limitation of Liability
        </h2>
        <p className="mb-4">
          Lexiq is provided &quot;as is&quot; without warranties of any kind. We
          are not liable for any damages resulting from your use of the
          platform.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms & Conditions from time to time. Continued
          use of Lexiq after changes means you accept the new terms.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Contact</h2>
        <p className="mb-4">
          If you have any questions about these Terms & Conditions, please
          contact us at{" "}
          <a href="mailto:support@lexiq.com" className="underline">
            support@lexiq.com
          </a>
          .
        </p>
      </main>
    </div>
  );
}
