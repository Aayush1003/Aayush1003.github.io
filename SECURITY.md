# Security Policy

## Supported Versions

Currently, this repository is a static portfolio website. The `main` branch is the only active branch and receives all security updates.

| Version | Supported          |
| ------- | ------------------ |
| Main    | :white_check_mark: |

## Reporting a Vulnerability

If you discover any security-related issues (e.g., cross-site scripting vulnerabilities, dependency issues in any linked projects, or exposed credentials), please do not report them via public GitHub issues.

Instead, please send an email to: **aayushgupta047@gmail.com**

Please include:
- A detailed description of the vulnerability.
- Steps to reproduce the issue.
- Potential impact.

I will acknowledge receipt of your vulnerability report within 48 hours and strive to resolve it promptly.

## Security Practices
- **No Inline Scripts**: The application strictly avoids inline `<script>` tags to mitigate Cross-Site Scripting (XSS) risks.
- **Dependency Management**: External libraries (like EmailJS) are loaded via secure CDNs (`https`) and deferred to improve performance and avoid blocking rendering.
- **Static Hosting**: As a GitHub Pages site, there is no backend database or server runtime vulnerable to typical backend attacks (e.g., SQL Injection).
