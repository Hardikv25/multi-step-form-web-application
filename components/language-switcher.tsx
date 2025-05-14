'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { Locale, routing } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';

interface Props {
  defaultValue: string;
  label: string;
}

export default function LanguageSwitcher({ defaultValue, label }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.replace(
      { pathname },
      { locale: newLocale as Locale }
    );
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px] bg-white" aria-label={label}>
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale === 'en' ? 'English' : 'हिन्दी'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
