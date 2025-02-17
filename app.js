const express = require('express')
const app = express()
const port = 3002

const cors = require('cors')

app.use(cors({
    origin: [
      'https://finefoods-antd-blue.vercel.app',
      'https://finefoods-antd-x81i-tawny.vercel.app',
      'http://localhost:5173',
       'https://onrender.com',
       'https://finefoods-antd-et2l.onrender.com'
    ],
    credentials: true,
    allowedHeaders: ['Origin', 'Accept', 'X-Requested-With', 'x-xsrf-token', 'x-custom-header', 'x-xsrf-pseudo', 'authorization', 'Content-Type'],
    methods: 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    maxAge: 86400
})); // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/auth/csrf-cookie', (req, res) => {
    const cookieOptions = {
      maxAge: 7200000, // 24 hours in milliseconds
      httpOnly: true,
      sameSite: 'None',
      path: '/',
      expires: 'Mon, 17 Feb 2025 16:37:47 GMT'
    };

    const cookieString = `XSRF-TOKEN=hellotoken; domain=onrender.com; Max-Age=${cookieOptions.maxAge / 1000}; HttpOnly; Path=${cookieOptions.path}; Secure; SameSite=${cookieOptions.sameSite};`;
    const cookieString2 = `MY-SESSION=session; domain=onrender.com; Max-Age=${cookieOptions.maxAge / 1000}; HttpOnly; Secure; SameSite=${cookieOptions.sameSite}; Path=${cookieOptions.path}`;
    res.setHeader('Set-Cookie', [cookieString, cookieString2]);

    res.setHeader('Cache-Control', 'no-store');

    // res.setHeader('Access-Control-Allow-Credentials', true)
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.status(204).send();
  });

  app.post('/auth/login', (req, res) => {
    // const myCookie = req.cookies.myCookie; // Requires cookie-parser middleware (see below)
    // const anotherCookie = req.cookies.anotherCookie;
    res.setHeader('Cache-Control', 'no-store');
    // res.setHeader('Access-Control-Allow-Credentials', true)
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')

    res.status(204).send();
    // if (myCookie) {
    //   res.send(`Value of myCookie: ${myCookie} and anotherCookie is ${anotherCookie}`);
    // } else {
    //   res.send('myCookie is not set');
    // }
  });

  const cookieParser = require('cookie-parser');
app.use(cookieParser()); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
