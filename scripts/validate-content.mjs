import { loadContent, defaultContentRoots } from '@paobu/core/content';

const roots = defaultContentRoots();
const preview = loadContent({ roots, allowUnreviewed: true });
const production = loadContent({ roots, allowUnreviewed: false });

const problems = [];
for (const entity of preview.allEntities) {
  if (entity.translations.length !== 2) {
    problems.push(`${entity.entityId} has ${entity.translations.length} translation(s), expected 2.`);
  }
  for (const locale of ['zh-CN', 'en']) {
    const rendered = entity.rendered[locale];
    if (!rendered) {
      problems.push(`${entity.entityId} is missing rendered ${locale} content.`);
      continue;
    }
    if (rendered.plainText.length < 200) {
      problems.push(`${entity.entityId} ${locale} body is suspiciously short (${rendered.plainText.length} characters).`);
    }
  }
}

const knowledge = preview.visible('knowledge');
const missingSection = knowledge.filter((entity) => {
  const type = entity.details.contentType;
  return type === 'glossary' && !entity.slug;
});
if (missingSection.length > 0) {
  problems.push(`Knowledge entities without a usable section: ${missingSection.map((entity) => entity.entityId).join(', ')}`);
}

console.log(`Content roots: ${roots.routes}, ${roots.knowledge}, ${roots.tools}`);
console.log(`Entities: ${preview.allEntities.length}`);
console.log(`Visible knowledge: ${knowledge.length}`);
console.log(`Production-visible entities: ${production.entities.length}`);

if (problems.length > 0) {
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log('Content validation passed.');
}
