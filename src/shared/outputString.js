const outputString = {
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
            <script>${js}</script>
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
              window.ts.transpile(${tsCode});
            </script>
          </body>
        </html>
      `;
  },
};

export default outputString;
