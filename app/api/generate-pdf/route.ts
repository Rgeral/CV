import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  let browser = null;

  try {
    // Lancer Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Récupérer l'URL de base
    const baseUrl = request.nextUrl.origin;
    const cvUrl = `${baseUrl}/cv-print`;

    // Aller sur la page de print
    await page.goto(cvUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Attendre que le contenu soit chargé
    await page.waitForSelector('body', { timeout: 10000 });

    // Attendre un peu plus pour que tout soit rendu
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Générer le PDF avec optimisation pour une page
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm',
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });

    await browser.close();

    // Retourner le PDF
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="CV.pdf"',
      },
    });
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);

    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      { error: 'Erreur lors de la génération du PDF', details: (error as Error).message },
      { status: 500 }
    );
  }
}
