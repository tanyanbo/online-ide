const formatOutputString = ({ html, css, js }) => {
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
};

export default formatOutputString;
