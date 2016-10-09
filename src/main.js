import 'babel-polyfill';
import { port } from 'config';
import app from 'app';

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is running at http://localhost:${port}/`);
});
