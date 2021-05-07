import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  url: "https://keycloak.devkraft.in/auth/",
  realm: "Studost",
  clientId: "studost",
  "auth-server-url": "https://keycloak.devkraft.in/auth/",
  "realm-public-key":
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhSRfsx8HjobjBKivYRUXOwFAonC17dMxVQAOPLNAgMjXERXG6nUlLFgcKhmsrSDMmLnsbauIJbVdrwXDCU1VLCfTRmTUsNwMxsTi5LI8BqLO+oxhLnfhebm6Rc6UoXbKFovHSfxVdMMeMydxz527ky7aFFrFW/9Fe63nZ0ee+fp1YJQAvyRD6C5g2WLTpRzp0ijBBqpsGXLkz4coig7JPZuIP2cnNRmif2zAPIZiMcY5FTCx02Kc7WNEpJiG+3WesRXH6LMzjZZQShIKtLdM0tHzp1OoJV40EKGFZh+x2ZTg3WYHdgqAMj5c714y0pKBp3EuCEgMwiv1QV5r9hJWmwIDAQAB",
  "ssl-required": "none",
  resource: "studost",
  "public-client": true,
  "use-resource-role-mappings": false,
  "confidential-port": 0,
  onLoad: "login-required",
});

export default keycloak;
