import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messagesMap: Record<string, () => Promise<any>> = {
  en: () => import('../messages/en.json'),
  hi: () => import('../messages/hi.json'),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await messagesMap[locale]()).default,
  };
});
