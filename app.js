const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const app = express()
const { MailtrapClient } = require("mailtrap");

// For this example to work, you need to set up a sending domain,
// and obtain a token that is authorized to send from the domain
const TOKEN = "c6e1f397581692bfad15864e9b3d1283";
const SENDER_EMAIL = "post-it@mail.com";
const RECIPIENT_EMAIL = "renerodrigues01@protonmail.com";

const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// #############################################################################
// Catch all handler for all other request.
/*app.use('*', (req,res) => {
  res.json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params
    })
})*/

app.use("/send", (req, res) =>{
  if(!req.body) {
    res.json({message: "Body is empty"}).status(400).end()
    return
  }

  client
  .send({
    category: "test",
    custom_variables: {
      hello: "world",
      year: 2022,
      anticipated: true,
    },
    from: sender,
    to: [{ email: RECIPIENT_EMAIL }],
    subject: "Hello from Mailtrap!",
    html: `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px;" class="main">
          <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
          <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
          <img alt="Inspect with Tabs" src="cid:welcome.png" style="width: 100%;">
          <p>Now send your email using our fake SMTP server and integration of your choice!</p>
          <p>Good luck! Hope it works. ${req.body}</p>
        </div>
        <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
        <style>
          .main { background-color: white; }
          a:hover { border-left-width: 1em; min-height: 2em; }
        </style>
      </body>
    </html>
  `,
  })
  .then(console.log, console.error);

  res.json({
    message: "Message send !",
  }).status(200)
})

module.exports = app
