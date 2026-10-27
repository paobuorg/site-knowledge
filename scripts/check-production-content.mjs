import { loadContent, defaultContentRoots } from '@paobu/core/content';

const content = loadContent({ roots: defaultContentRoots(), allowUnreviewed: false });
const articles = content.visible('knowledge');
if (articles.length === 0) {
  console.error('Production content guard failed: no published knowledge article is available.');
  process.exit(1);
}
console.log(`Production content guard passed: knowledge=${articles.length}.`);
