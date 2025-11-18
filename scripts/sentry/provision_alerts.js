#!/usr/bin/env node
/*
  Provision Sentry alert rules from JSON templates.

  Usage:
    SENTRY_AUTH_TOKEN=... SENTRY_ORG=org SENTRY_PROJECT=proj node provision_alerts.js

  This script posts each JSON file under `scripts/sentry/templates/` to the
  Sentry project rules endpoint: POST /api/0/projects/:org/:project/rules/

  NOTE: Sentry's alert rule API has several variants (legacy "issue" rules vs metric alerts).
  These templates are a starting point; you may need to adapt the JSON to match your Sentry org.
*/

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const ORG = process.env.SENTRY_ORG;
const PROJECT = process.env.SENTRY_PROJECT;
const AUTH = process.env.SENTRY_AUTH_TOKEN;
const API_BASE = process.env.SENTRY_API_BASE || 'https://sentry.io/api/0';

if (!ORG || !PROJECT || !AUTH) {
  console.error('Missing required env vars. Set SENTRY_ORG, SENTRY_PROJECT, and SENTRY_AUTH_TOKEN.');
  process.exit(1);
}

const templatesDir = path.join(__dirname, 'templates');

async function provision() {
  const files = fs.readdirSync(templatesDir).filter((f) => f.endsWith('.json'));
  if (!files.length) {
    console.log('No templates found in', templatesDir);
    return;
  }

  for (const file of files) {
    const filePath = path.join(templatesDir, file);
    const dataRaw = fs.readFileSync(filePath, 'utf8');
    let body;
    try {
      body = JSON.parse(dataRaw);
    } catch (err) {
      console.error('Invalid JSON in', filePath, err.message);
      continue;
    }

    const url = `${API_BASE}/projects/${ORG}/${PROJECT}/rules/`;
    console.log('Posting template', file, 'to', url);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AUTH}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      if (!res.ok) {
        console.error(`Failed to create rule from ${file}:`, res.status, res.statusText, text);
      } else {
        console.log(`Created rule from ${file}:`, text);
      }
    } catch (err) {
      console.error('Request failed for', file, err.message);
    }
  }
}

provision().catch((err) => {
  console.error('Provisioning failed:', err);
  process.exit(1);
});
