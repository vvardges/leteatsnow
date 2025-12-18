'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ marginTop: 24 }}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  const router = useRouter();
  const lastUpdated = '2025-12-16'; // change when you update this policy

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <header>
        <h1>Privacy Policy (EU/EEA – GDPR)</h1>
        <p>
          <strong>Last updated:</strong> {lastUpdated}
        </p>
        <p>
          This Privacy Policy explains how <strong>LetEatSnow</strong> (“we”, “us”) processes personal data when you use
          this website/app (the “Service”). We aim to process as little data as possible and comply with the EU/EEA{' '}
          <strong>General Data Protection Regulation (GDPR)</strong>.
        </p>
      </header>

      <Section id="controller" title="1) Data controller & contact">
        <p>
          <strong>Controller:</strong> LetEatSnow
          <br />
          <strong>Country:</strong> Armenia
          <br />
          <strong>Contact email:</strong> <a href="mailto:vardanyan@vardges.dev">vardanyan@vardges.dev</a>{' '}
        </p>
      </Section>

      <Section id="what-we-collect" title="2) What data we process">
        <h3>Camera / video-related data</h3>
        <ul>
          <li>
            If the Service asks to use your device camera, access happens only after you grant permission in your
            browser/device.
          </li>
          <li>
            <strong>We do not record or store video or audio</strong> from your camera.
          </li>
          <li>
            <strong>We do not store photos or screenshots</strong> by default.
          </li>
          <li>
            If face-related processing is used (for gameplay/interaction), it is used only to enable the experience and
            not to identify you by name.
          </li>
          <li>
            We do not create or store “face templates” for identification purposes, and we do not run identity matching
            across services.
          </li>
        </ul>

        <h3>Leaderboard data</h3>
        <p>If you participate in the leaderboard, we may process and display:</p>
        <ul>
          <li>your chosen <strong>username</strong> (nickname/alias)</li>
          <li>game results (e.g., score, time, rank)</li>
          <li>timestamps and basic technical data needed to prevent abuse and ensure integrity</li>
        </ul>
        <p>
          Please avoid using your real name or including sensitive information in your username.
        </p>

        <h3>Analytics data (Firebase Analytics)</h3>
        <p>We use <strong>Firebase Analytics</strong> to understand how the Service is used and to improve performance.</p>
        <p>Depending on configuration, Firebase Analytics may collect:</p>
        <ul>
          <li>device and browser/app information (e.g., OS version, device model, language)</li>
          <li>approximate location (typically derived from IP, usually at city/region level)</li>
          <li>usage events (e.g., screens visited, interactions), session duration, diagnostics</li>
        </ul>
        <p>
          We do not intentionally send sensitive personal data to analytics. If you believe analytics is receiving
          unintended data, contact us and we will investigate.
        </p>
      </Section>

      <Section id="purposes" title="3) Purposes and legal bases (GDPR)">
        <p>We process personal data for the following purposes and legal bases:</p>
        <ul>
          <li>
            <strong>To provide the Service</strong> (GDPR Art. 6(1)(b)) — e.g., show gameplay results and leaderboard.
          </li>
          <li>
            <strong>Consent</strong> (GDPR Art. 6(1)(a)) — e.g., camera access (requested by your browser) and, where
            required, analytics/cookies.
          </li>
          <li>
            <strong>Legitimate interests</strong> (GDPR Art. 6(1)(f)) — security, abuse prevention, debugging, service
            reliability (only where balanced and necessary).
          </li>
          <li>
            <strong>Legal obligations</strong> (GDPR Art. 6(1)(c)) — if we must comply with applicable laws or lawful
            requests.
          </li>
        </ul>
      </Section>

      <Section id="cookies" title="4) Cookies and similar technologies">
        <p>
          We may use cookies/local storage for strictly necessary functionality and (where enabled) analytics. In the
          EU/EEA, analytics cookies should be used only after you provide consent (depending on your implementation).
        </p>
        <p>You can also control cookies through your browser settings.</p>
      </Section>

      <Section id="sharing" title="5) Sharing of data">
        <p>
          We do not sell your personal data. We may share data with service providers that help us operate the Service,
          such as:
        </p>
        <ul>
          <li>Google/Firebase (Firebase Analytics)</li>
          <li>hosting/CDN providers (to deliver the Service)</li>
        </ul>
        <p>
          We share only what is necessary and, where required, use appropriate contractual protections (e.g., data
          processing terms).
        </p>
      </Section>

      <Section id="transfers" title="6) International data transfers">
        <p>
          Because we are based in <strong>Armenia</strong> and also use providers that may process data in other
          countries (including the United States), your data may be transferred outside the EU/EEA.
        </p>
        <p>
          Where required, we rely on appropriate safeguards such as the <strong>European Commission Standard Contractual
          Clauses (SCCs)</strong> and other measures depending on the provider and configuration.
        </p>
      </Section>

      <Section id="retention" title="7) Data retention">
        <ul>
          <li>
            <strong>Camera/video:</strong> not stored (processed live only).
          </li>
          <li>
            <strong>Leaderboard:</strong> retained while the leaderboard feature is active or until you request deletion
            (subject to integrity/security needs).
          </li>
          <li>
            <strong>Analytics:</strong> retained according to Firebase/Google settings and our configuration.
          </li>
        </ul>
        <p>
          We keep data only as long as needed for the purposes described above, unless a longer period is required by
          law or for security purposes.
        </p>
      </Section>

      <Section id="rights" title="8) Your rights (EU/EEA)">
        <p>If you are in the EU/EEA, you have rights including:</p>
        <ul>
          <li>access to your personal data</li>
          <li>rectification</li>
          <li>deletion</li>
          <li>restriction and objection</li>
          <li>data portability (where applicable)</li>
          <li>withdraw consent at any time (where processing is based on consent)</li>
          <li>lodge a complaint with your local Data Protection Authority (DPA)</li>
        </ul>
        <p>
          To exercise your rights, contact{' '}
          <a href="mailto:vardanyan@vardges.dev">vardanyan@vardges.dev</a>{' '}
        </p>
      </Section>

      <Section id="children" title="9) Children">
        <p>
          The Service is not intended for children under the age of 16. We do not knowingly
          collect personal data from children. If you believe a child provided personal data, contact us to request
          deletion.
        </p>
      </Section>

      <Section id="changes" title="10) Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. We will post the updated version on this page and update
          the “Last updated” date.
        </p>
      </Section>

      <footer style={{ marginTop: 32 }}>
        <p>
          <strong>Provider links (recommended to include):</strong>
        </p>
        <ul>
          <li>
            Firebase Privacy:{' '}
            <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noreferrer">
              https://firebase.google.com/support/privacy
            </a>
          </li>
          <li>
            Google Privacy Policy:{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              https://policies.google.com/privacy
            </a>
          </li>
        </ul>
        <div style={{ marginBottom: 16, marginTop: 32 }}>
          <Button onClick={() => router.push('/')}>
            ← Back to Home
          </Button>
        </div>
      </footer>
    </div>
  );
}