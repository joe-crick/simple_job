import Zone from 'can-zone';
import express from 'express';
import path from 'path';
import dom from 'can-zone-jsdom';
import requests from 'done-ssr/zones/requests';

const app = express(); 

const PORT = process.env.PORT || 3000;

app.use(express.static('build', { index: false }));
app.use(express.static('.'));

app.get('*', async (request, response) => {
  var zone = new Zone([
    // Overrides XHR, fetch
    requests(request),

    // Sets up a DOM
    dom(request, {
      root: __dirname + '/../build',
      html: 'index.html'
    })
  ]);

  const { html } = await zone.run();
  response.end(html);
});

require('http')
  .createServer(app)
  .listen(PORT);

console.error(`Server running at http://localhost:${PORT}`);