import { markdown } from "./markdown";

type HelperFunctions = {
    [key: string]: (...args: any[]) => any;
};

/**
 * Processa um template string substituindo as expressões entre {{}} pelos seus valores avaliados
 */
async function process(
    template: string,
    context: Record<string, any> = {},
    helpers: HelperFunctions = {}
): Promise<string> {
    
    // const regex = /\{\{([^{}]*)\}\}/g;
    // const regex = /\{\{(.*?)\}\}/g;
    const regex = /\{\{(.*?)\}\}/gs;
    
    const matches = Array.from(template.matchAll(regex));
    
    const replacements = await Promise.all(
        matches.map(async (match) => {
            const [fullMatch, expression] = match;
            
            try {
                const evaluateExpression = async (expr: string): Promise<any> => {
                    const sandboxCode = `
                        return (async () => {
                            with (context) {
                                try {
                                    return await (${expr});
                                } catch (e) {
                                    if (e instanceof TypeError && (e.message.includes('null') || e.message.includes('undefined'))) {
                                        return undefined;
                                    }
                                    throw e;
                                }
                            }
                        })();
                    `;

                    const sandbox = {
                        context: {
                            ...context,
                            ...helpers,
                            Object,
                            Array,
                            String,
                            Number,
                            Math,
                            JSON,
                            map: Function.prototype.call.bind(Array.prototype.map),
                            filter: Function.prototype.call.bind(Array.prototype.filter),
                            join: Function.prototype.call.bind(Array.prototype.join),
                        }
                    };

                    const fn = new Function('context', sandboxCode)

                    return await fn(sandbox.context)
                };

                const result = await evaluateExpression(expression.trim());

                if (result === null) {
                    return { original: fullMatch, replacement: "null" };
                } else if (result === undefined) {
                    return { original: fullMatch, replacement: "" };
                } else if (typeof result === "object") {
                    return { original: fullMatch, replacement: JSON.stringify(result) };
                }

                return { original: fullMatch, replacement: String(result) };
            } catch (error) {
                throw new Error(`Error on template process: ${expression}`, { cause: error });
            }
        })
    );
    
    let result = template

    replacements.forEach(({ original, replacement }) => {
        result = result.replace(original, replacement);
    });
    
    return result;
}

const helpers = {
    markdownToHtml: async (md: string) => {
        return await markdown.toHtml(md);
    },

    formatCurrency: (
        value: number,
        locale: string = 'pt-BR',
        currency: string = 'BRL'
    ): string => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits: 2
        }).format(value);
    },

    truncate: (
        text: string,
        maxLength: number = 100,
        suffix: string = '...'
    ): string => {
        if (!text || text.length <= maxLength) return text || '';
        return text.substring(0, maxLength) + suffix;
    },

    formatNumber: (
        value: number,
        locale: string = 'pt-BR',
        options: Intl.NumberFormatOptions = { minimumFractionDigits: 2 }
    ): string => {
        return new Intl.NumberFormat(locale, options).format(value);
    },

    formatPercent: (
        value: number,
        locale: string = 'pt-BR',
        decimalPlaces: number = 2
    ): string => {
        return new Intl.NumberFormat(locale, {
            style: 'percent',
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        }).format(value);
    },

    slugify: (text: string): string => {
        if (!text) return '';
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, '-');
    },

    formatDate: (
        date: Date | string | number,
        mask: string = 'DD/MM/YYYY',
        locale: string = 'pt-BR'
    ): string => {
        if (!date) return '';

        const dateObj = date instanceof Date ? date : new Date(date);

        if (isNaN(dateObj.getTime())) {
            return 'Data inválida';
        }

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const day = dateObj.getDate();
        const hours24 = dateObj.getHours();
        const hours12 = hours24 % 12 || 12;
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();
        const ampm = hours24 >= 12 ? 'pm' : 'am';
        const AMPM = hours24 >= 12 ? 'PM' : 'AM';

        const monthNames = Array.from({ length: 12 }, (_, i) =>
            new Date(2000, i).toLocaleString(locale, { month: 'long' })
        );

        const monthNamesShort = Array.from({ length: 12 }, (_, i) =>
            new Date(2000, i).toLocaleString(locale, { month: 'short' })
        );

        const weekday = dateObj.getDay();

        const weekdayNames = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(2000, 0, 2 + i);
            return d.toLocaleString(locale, { weekday: 'long' });
        });

        const weekdayNamesShort = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(2000, 0, 2 + i);
            return d.toLocaleString(locale, { weekday: 'short' });
        });

        let result = '';
        let inEscapeMode = false;
        let currentToken = '';

        for (let i = 0; i < mask.length; i++) {
            const char = mask[i];

            if (char === '[') {
                inEscapeMode = true;
                continue;
            }

            if (char === ']') {
                inEscapeMode = false;
                continue;
            }

            if (inEscapeMode) {
                result += char;
                continue;
            }

            if (i > 0 && char === mask[i - 1]) {
                currentToken += char;
            } else {
                if (currentToken) {
                    result += processDateToken(currentToken, dateObj, {
                        year, month, day, hours24, hours12, minutes, seconds, ampm, AMPM,
                        monthNames, monthNamesShort, weekdayNames, weekdayNamesShort, weekday
                    });
                    currentToken = char;
                } else {
                    currentToken = char;
                }
            }
        }

        if (currentToken) {
            result += processDateToken(currentToken, dateObj, {
                year, month, day, hours24, hours12, minutes, seconds, ampm, AMPM,
                monthNames, monthNamesShort, weekdayNames, weekdayNamesShort, weekday
            });
        }

        return result;
    },
};

function processDateToken(
    token: string,
    date: Date,
    values: {
        year: number,
        month: number,
        day: number,
        hours24: number,
        hours12: number,
        minutes: number,
        seconds: number,
        ampm: string,
        AMPM: string,
        monthNames: string[],
        monthNamesShort: string[],
        weekdayNames: string[],
        weekdayNamesShort: string[],
        weekday: number
    }
): string {
    const {
        year, month, day, hours24, hours12, minutes, seconds, ampm, AMPM,
        monthNames, monthNamesShort, weekdayNames, weekdayNamesShort, weekday
    } = values;

    switch (token) {
        case 'YYYY': return year.toString();
        case 'YY': return year.toString().slice(-2);
        case 'MMMM': return monthNames[month];
        case 'MMM': return monthNamesShort[month];
        case 'MM': return (month + 1).toString().padStart(2, '0');
        case 'M': return (month + 1).toString();
        case 'DDDD': return weekdayNames[weekday];
        case 'DDD': return weekdayNamesShort[weekday];
        case 'DD': return day.toString().padStart(2, '0');
        case 'D': return day.toString();
        case 'HH': return hours24.toString().padStart(2, '0');
        case 'H': return hours24.toString();
        case 'hh': return hours12.toString().padStart(2, '0');
        case 'h': return hours12.toString();
        case 'mm': return minutes.toString().padStart(2, '0');
        case 'm': return minutes.toString();
        case 'ss': return seconds.toString().padStart(2, '0');
        case 's': return seconds.toString();
        case 'a': return ampm;
        case 'A': return AMPM;
        default: return token;
    }
}

export const templateEngine = {
    process,
    helpers
}

// Agora funciona corretamente:
// const result = await templateEngine.process('{{markdownToHtml(text)}}', { text: '# Hello' }, templateEngine.helpers);
// OU
// const result = await templateEngine.process('{{await markdownToHtml(text)}}', { text: '# Hello' }, templateEngine.helpers);