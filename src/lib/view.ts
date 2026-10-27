import type { ContentEntity, KnowledgeDetails } from '@paobu/core/content';
import { TOPIC_META, type Locale, type TopicId } from '@paobu/core/lib/i18n';
import { localePrefix } from '@paobu/core/lib/routing';
import { siteOrigin } from '@paobu/core/lib/sites';

export const TOPIC_COPY: Record<TopicId, { zh: string; en: string }> = {
  training: { zh: '强度、频率与周期安排', en: 'Intensity, frequency and cycles' },
  technique: { zh: '动作、步频与地形适应', en: 'Form, cadence and terrain' },
  recovery: { zh: '睡眠、休息与负荷观察', en: 'Sleep, rest and load awareness' },
  nutrition: { zh: '日常饮食与长距离补给', en: 'Daily food and fuelling' },
  gear: { zh: '跑鞋、衣物与设备', en: 'Shoes, clothing and devices' },
  health: { zh: '疼痛观察与求助边界', en: 'Pain, evidence and care' },
  safety: { zh: '交通、天气与山径', en: 'Traffic, weather and trails' },
  habits: { zh: '开始、坚持与复盘', en: 'Starting, sustaining and reviewing' },
  culture: { zh: '赛事、记录与研究阅读', en: 'Races, records and research' },
};

export const CONTENT_TYPE_COPY: Record<string, { zh: string; en: string }> = {
  concept: { zh: '概念', en: 'Concept' },
  guide: { zh: '指南', en: 'Guide' },
  answer: { zh: '问答', en: 'Answer' },
  plan: { zh: '计划', en: 'Plan' },
  checklist: { zh: '清单', en: 'Checklist' },
  glossary: { zh: '术语', en: 'Glossary' },
  'learning-path': { zh: '学习路径', en: 'Learning path' },
};

export function knowledgeDetails(entity: ContentEntity): KnowledgeDetails {
  return entity.details as KnowledgeDetails;
}

export function knowledgeSection(entity: ContentEntity): 'articles' | 'glossary' | 'paths' {
  const type = knowledgeDetails(entity).contentType;
  if (type === 'glossary') return 'glossary';
  if (type === 'learning-path') return 'paths';
  return 'articles';
}

export function knowledgeHref(entity: ContentEntity, locale: Locale): string {
  return `${localePrefix(locale)}/${knowledgeSection(entity)}/${entity.slug}/`;
}

export function entityHref(entity: ContentEntity, locale: Locale): string {
  const prefix = localePrefix(locale);
  if (entity.kind === 'knowledge') return knowledgeHref(entity, locale);
  if (entity.kind === 'route') return `${siteOrigin('routes')}${prefix}/routes/${entity.slug}/`;
  return `${siteOrigin('tools')}${prefix}/tools/${entity.slug}/`;
}

export function topicLabel(topic: string, locale: Locale): string {
  return TOPIC_META[topic as TopicId]?.[locale === 'zh-CN' ? 'zh' : 'en'] ?? topic;
}

export function contentTypeLabel(value: string, locale: Locale): string {
  return CONTENT_TYPE_COPY[value]?.[locale === 'zh-CN' ? 'zh' : 'en'] ?? value;
}

export function formatDate(value: string | null, locale: Locale): string {
  if (!value) return locale === 'zh-CN' ? '尚未审阅' : 'Not yet reviewed';
  return new Intl.DateTimeFormat(locale === 'zh-CN' ? 'zh-CN' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}
