import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
// export const API = publicRuntimeConfig.PRODUCTION? 'getfit.com':publicRuntimeConfig.APP_URL
export const APP_NAME= publicRuntimeConfig.APP_NAME
export const API= publicRuntimeConfig.APP_URL
export const DOMAIN= publicRuntimeConfig.DOMAIN_DEVELOPMENT
export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME
export const  GOOGLE_CLIENT_ID = publicRuntimeConfig. GOOGLE_CLIENT_ID