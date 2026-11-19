import Link from "next/link";
import styles from "./page.module.css";

const steps = [
  {
    number: "01",
    title: "Create an Ubuntu Server VM",
    description:
      "Install Ubuntu Server in VirtualBox and choose NAT networking with a port-forwarding rule for port 3000.",
  },
  {
    number: "02",
    title: "Prepare the server",
    description:
      "Install Git and Node.js 22, then clone this project and install its dependencies with npm ci.",
  },
  {
    number: "03",
    title: "Build and run",
    description:
      "Create the production build and start Next.js listening on 0.0.0.0:3000 so the host can reach the VM.",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="VirtualBox Deploy Lab home">
          <span className={styles.brandMark}>V</span>
          <span>VirtualBox Deploy Lab</span>
        </Link>
        <span className={styles.badge}>LEARNING PROJECT</span>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>NEXT.JS · UBUNTU SERVER · VIRTUALBOX</p>
        <h1>From local app to your own server.</h1>
        <p className={styles.lead}>
          A small Next.js project for learning how to build, deploy, and verify
          an application on an Ubuntu Server virtual machine.
        </p>
        <div className={styles.actions}>
          <a className={styles.primaryAction} href="/api/health">
            Check health endpoint <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.textAction} href="#steps">
            See the deployment steps
          </a>
        </div>
      </section>

      <section className={styles.status} aria-labelledby="status-title">
        <div>
          <p className={styles.eyebrow}>DEPLOYMENT CHECK</p>
          <h2 id="status-title">Is the app responding?</h2>
        </div>
        <a className={styles.endpoint} href="/api/health">
          <span className={styles.statusDot} />
          <code>GET /api/health</code>
          <span aria-hidden="true">→</span>
        </a>
      </section>

      <section className={styles.steps} id="steps" aria-labelledby="steps-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>YOUR FIRST DEPLOYMENT</p>
            <h2 id="steps-title">Three steps to get started</h2>
          </div>
          <a href="#steps">Review the checklist <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.stepGrid}>
          {steps.map((step) => (
            <article className={styles.stepCard} key={step.number}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Built for learning. Run it on a VM you control.</span>
        <span>Next.js App Router</span>
      </footer>
    </main>
  );
}
