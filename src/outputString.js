const formatOutputString = (html, css, js) => {
  return `
        <html lang="en-US">
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;
};

export default formatOutputString;
