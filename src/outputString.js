const formatOutputString = (html, css, js) => {
  const str = `
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
  console.log(str);
  return str;
};

export default formatOutputString;
