const fetch = require('node-fetch');

async function fetchCommits(token, owner, repo, base, head) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`, {
    headers: {
      'Authorization': `token ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok`);
  }

  const data = await response.json();
  return data.commits;
}

// Ersetze die Platzhalter mit deinen tatsächlichen Werten
const token = process.env.GITHUB_TOKEN;
const owner = 'julianrie';
const repo = 'julianrie.github.io';
const base = 'master';
const head = 'development';

fetchCommits(token, owner, repo, base, head)
  .then(commits => {
    console.log(commits);
    // Hier kannst du das Changelog erstellen, indem du die Commit-Informationen auswertest
  })
  .catch(error => {
    console.error('Error:', error);
  });
