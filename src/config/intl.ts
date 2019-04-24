/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import { Language } from 'reducers';
import arLocaleData from 'react-intl/locale-data/ar';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';

import arTranslationMessages from '../translations/ar';
import enTranslationMessages from '../translations/en';
import frTranslationMessages from '../translations/fr';

addLocaleData([...enLocaleData, ...arLocaleData, ...frLocaleData]);

export const availableLanguages: Language[] = ['en', 'fr', 'ar'];

export const DEFAULT_LOCALE: Language = 'fr';

export default {
  ar: arTranslationMessages,
  en: enTranslationMessages,
  fr: frTranslationMessages,
};
