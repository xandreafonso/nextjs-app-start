
const domain = process.env.APP_DOMAIN ?? "[Without domain]"
const scheme = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export const redirectUtils = {
    url: (path: string) => new URL(path, `${scheme}://${domain}`)
}