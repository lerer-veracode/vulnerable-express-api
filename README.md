# Vulnerable Express Application

This is a simple Node.js Express application with intentional vulnerabilities for demonstration purposes.

## APIs

### `/`

- **Method:** `GET`
- **Description:** A simple endpoint that returns "Hello from Express!".
- **Vulnerabilities:** None

### `/lookup`

- **Method:** `GET`
- **Query Parameter:** `domain`
- **Description:** Performs a DNS lookup on the provided domain.
- **Vulnerabilities:**
  - **Command Injection:** The `domain` parameter is not sanitized before being used in a shell command. An attacker can inject arbitrary commands, for example: `?domain=google.com; ls -a`.

### `/search`

- **Method:** `GET`
- **Query Parameter:** `q`
- **Description:** Searches for a given query.
- **Vulnerabilities:**
  - **Cross-Site Scripting (XSS):** The `q` parameter is reflected in the response without any output encoding. An attacker can inject malicious scripts, for example: `?q=<script>alert('''XSS''')</script>`.

### `/search-regex`

- **Method:** `GET`
- **Query Parameters:** `pattern`, `text`
- **Description:** Matches a regular expression pattern against a text.
- **Vulnerabilities:**
  - **Regular Expression Denial of Service (ReDoS):** The regular expression is constructed from user input without proper validation. An attacker can provide a malicious pattern that causes the server to hang, for example: `?pattern=(a+)+&text=aaaaaaaaaaaaaaaaaaaaaaaaaaaaa!`

### Error Handling

- **Description:** The application has a generic error handler that returns detailed error messages with stack traces.
- **Vulnerabilities:**
  - **Information Leakage:** The stack traces can reveal sensitive information about the server's internal workings, such as file paths and library versions.
