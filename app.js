// app.js
const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});

    // Insecure code: Using `exec` with unsanitized user input
app.get('/lookup', (req, res) => {
  const domain = req.query.domain;
  // Attacker can inject additional commands with domain like `google.com; ls -a`
  exec(`nslookup ${domain}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${error.message}`);
    }
    res.send(stdout);
  });
});

// Insecure code: Reflecting user input in the response
app.get('/search', (req, res) => {
  const query = req.query.q;
  // An attacker could submit `?q=<script>alert('XSS')</script>`
  // This will execute the script in the user's browser
  res.send(`<h1>Search results for: ${query}</h1>`);
});

// Insecure code: Vulnerable regular expression
app.get('/search-regex', (req, res) => {
  const pattern = req.query.pattern;
  // Attacker can craft a specific input to cause the regex engine to backtrack excessively
  const regex = new RegExp(`^(${pattern})*$`);
  if (regex.test(req.query.text)) {
    res.send('Match!');
  } else {
    res.send('No match.');
  }
});


// Insecure code: Returning detailed errors with stack traces
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.stack); // Leaks internal server information
});
