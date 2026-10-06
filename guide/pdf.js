const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + __dirname + '/guide.html'); await p.evaluate(() => document.fonts.ready);
  console.log('fonts', await p.evaluate(() => document.fonts.check('600 30px "Cormorant SC"') && document.fonts.check('700 17px "Atkinson Hyperlegible"')));
  await p.pdf({ path: 'guide.pdf', format: 'Letter', printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: '<div style="width:100%;text-align:center;font-size:12pt;font-family:Arial;color:#3f475a">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>' });
  await b.close(); })();
