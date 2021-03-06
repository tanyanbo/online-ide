type Output = {
  "HTML+CSS+JS": (html?: string, css?: string, js?: string) => string;
  "HTML+CSS+TS": (html?: string, css?: string, js?: string) => string;
};

const OUTPUT_STRING: Output = {
  "HTML+CSS+JS": function (html, css, js) {
    return `
          <html lang="en-US">
          <head>
            <title>Iframe</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${js}
              } catch(e) {
                throw new Error('custom error');
              }
            </script>
          </body>
        </html>
      `;
  },
  "HTML+CSS+TS": function (html, css, tsCode) {
    return `        
        <html lang="en-US">
          <head>
            <title>Iframe</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script src="https://unpkg.com/typescript@latest/lib/typescriptServices.js"></script>
            <script>
              eval(window.ts.transpile(\`${tsCode}\`));
            </script>
          </body>
        </html>
      `;
  },
};

export default OUTPUT_STRING;
