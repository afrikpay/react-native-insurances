import * as Localization from 'expo-localization'
import { IntlMessageFormat } from 'intl-messageformat'
import fr from './messages/fr'
import en from './messages/en'
import Auth from '../utils/Auth'

const locales: { [key: string]: { [key: string]: string } } = {
    "fr": fr,
    "en": en
}

var lang: string;

const i18n = (messageId: string, values?: { [key: string]: { [key: string]: string } }) => {
    getLanguage()
    
    let locale = Localization.getLocales()[0]?.languageCode
    if (!!lang) {
        locale = lang
    }
    if (locale && !locales[locale]){
        locale = lang || 'fr'
    }
    
    const message = locales[locale!]![messageId]
    const formatter = new IntlMessageFormat(message!, locale!)
    return `${formatter.format(values)}`
}

export default i18n

const getLanguage = async () => {
    lang = await Auth.getLang()
}