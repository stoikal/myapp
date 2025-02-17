const express = require('express')
const app = express()
const port = 3001

const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:5173', 'https://finefoods-antd-x81i-tawny.vercel.app'],
    credentials: true,
})); // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/auth/csrf-cookie', (req, res) => {
    const cookieOptions = {
      maxAge: 7200000, // 24 hours in milliseconds
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'none', // Recommended for security
      path: '/',
      expires: 'Mon, 17 Feb 2025 16:37:47 GMT'
    };

    const cookieString = `XSRF-TOKEN=hellotoken; expires=${cookieOptions.expires}; Max-Age=${cookieOptions.maxAge / 1000}; path=${cookieOptions.path}; secure; samesite=${cookieOptions.sameSite};`;
    const cookieString2 = `MY-SESSION=session; Expires=${cookieOptions.expires}; Max-Age=${cookieOptions.maxAge / 1000}; HttpOnly; Secure; SameSite=${cookieOptions.sameSite}; Path=${cookieOptions.path}`;
    res.setHeader('Set-Cookie', [cookieString, cookieString2]);

    res.setHeader('Cache-Control', 'no-store');

    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.status(204).send();
  });

  app.post('/auth/login', (req, res) => {
    // const myCookie = req.cookies.myCookie; // Requires cookie-parser middleware (see below)
    // const anotherCookie = req.cookies.anotherCookie;
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')

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
