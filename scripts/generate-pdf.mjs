// Renders the built /cv-print page to dist/cv.pdf. Runs after `astro build`.
import { preview } from "astro";
import puppeteer from "puppeteer";

const server = await preview({ server: { port: 4329, host: "127.0.0.1" }, logLevel: "warn" });
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });

try {
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:4329/cv-print/", { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluateHandle("document.fonts.ready");
  await page.pdf({ path: "dist/cv.pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log("✓ dist/cv.pdf generated");
} finally {
  await browser.close();
  await server.stop();
}
