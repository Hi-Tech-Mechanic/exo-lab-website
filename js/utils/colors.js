/**
 * Цветовые константы для Canvas-рендеринга.
 * Синхронизированы с CSS-переменными из root.css.
 * Использование: getComputedStyle(document.documentElement) + разбор rgb/rgba.
 */

const rootStyles = () => getComputedStyle(document.documentElement);

/** Возвращает RGBA-строку для Canvas из CSS переменной (например --cyan: #00f0ff → строку '0,240,255') */
function cssColorToRgbParts(cssVar) {
    const val = rootStyles().getPropertyValue(cssVar).trim();
    if (!val) return '';
    // Проверка на hex (#00f0ff)
    if (val.startsWith('#')) {
        const r = parseInt(val.slice(1, 3), 16);
        const g = parseInt(val.slice(3, 5), 16);
        const b = parseInt(val.slice(5, 7), 16);
        return `${r},${g},${b}`;
    }
    // Проверка на rgb(...) / rgba(...)
    const match = val.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
        return `${match[1]},${match[2]},${match[3]}`;
    }
    // Если это уже запятые (как --neon-color)
    const commaMatch = val.match(/^(\d+),\s*(\d+),\s*(\d+)/);
    if (commaMatch) {
        return `${commaMatch[1]},${commaMatch[2]},${commaMatch[3]}`;
    }
    return val;
}

// ---- Приватные геттеры (чтобы не было конфликта имён с методами, принимающими alpha) ----
const _colors = {
    neon: () => cssColorToRgbParts('--neon-color') || '216,219,0',
    accentOrange: () => cssColorToRgbParts('--accent-orange') || '255,107,0',
};

const Colors = {
    /** Возвращает строку "R,G,B" для использования в шаблонах */
    getNeonRgb: _colors.neon,
    getAccentOrangeRgb: _colors.accentOrange,

    /** Создаёт rgba(R,G,B,alpha) строку */
    rgba(colorRgb, alpha) {
        return `rgba(${colorRgb()},${alpha})`;
    },

    neon(alpha) {
        return this.rgba(_colors.neon, alpha);
    },
    accentOrange(alpha) {
        return this.rgba(_colors.accentOrange, alpha);
    },

    hex(colorRgb) {
        const parts = colorRgb().split(',');
        const r = parseInt(parts[0]);
        const g = parseInt(parts[1]);
        const b = parseInt(parts[2]);
        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }
};

export default Colors;