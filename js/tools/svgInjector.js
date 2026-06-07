/**
 * SVG Injector - Динамическая вставка SVG с управлением цветом через CSS
 * Решение FOUC: скрытие до загрузки, показ после
 */

class SVGInjector {
    constructor() {
        this.injected = false;
    }

    /**
     * Инициализация инъектора
     */
    init() {
        if (this.injected) return;
        this.injected = true;

        // Устанавливаем opacity: 0 для всех SVG-контейнеров
        this.hideSVGs();

        // Ждём загрузки DOM и всех SVG
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadAndInject());
        } else {
            this.loadAndInject();
        }
    }

    /**
     * Скрывает SVG контейнеры до загрузки
     */
    hideSVGs() {
        const containers = document.querySelectorAll('[data-svg-src]');
        containers.forEach(container => {
            container.style.opacity = '0';
            container.style.transition = 'opacity 0.2s ease';
        });
    }

    /**
     * Загружает и вставляет SVG
     */
    async loadAndInject() {
        const containers = document.querySelectorAll('[data-svg-src]');
        
        for (const container of containers) {
            const svgPath = container.getAttribute('data-svg-src');
            const targetColor = container.getAttribute('data-svg-color') || 'var(--accent)';
            
            try {
                const svgContent = await this.loadSVG(svgPath);
                const modifiedSVG = this.modifySVGColors(svgContent, targetColor);
                container.innerHTML = modifiedSVG;
            } catch (error) {
                console.error('Failed to load SVG:', svgPath, error);
            }
        }

        // Показываем SVG с анимацией
        setTimeout(() => {
            containers.forEach(container => {
                container.style.opacity = '1';
            });
        }, 50);
    }

    /**
     * Загружает SVG файл
     */
    async loadSVG(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load SVG: ${response.status}`);
        }
        return await response.text();
    }

    /**
     * Модифицирует SVG для динамического цвета
     */
    modifySVGColors(svgContent, targetColor) {
        // Заменяем fill и stroke на currentColor
        let modified = svgContent;
        
        // Удаляем inline стили
        modified = modified.replace(/style="[^"]*"/gi, '');
        
        // Заменяем fill="цвет" на fill="currentColor"
        modified = modified.replace(/fill="#[0-9a-fA-F]{3,6}|fill="rgb\([^)]+\)"/gi, 'fill="currentColor"');
        
        // Заменяем stroke="цвет" на stroke="currentColor"
        modified = modified.replace(/stroke="#[0-9a-fA-F]{3,6}|stroke="rgb\([^)]+\)"/gi, 'stroke="currentColor"');
        
        // Добавляем CSS-переменную для цвета если указана
        if (targetColor && targetColor !== 'var(--accent)') {
            modified = modified.replace(
                /<svg([^>]*)>/i,
                `<svg$1><style>svg { color: ${targetColor}; }</style>`
            );
        }
        
        return modified;
    }
}

// Экспорт для использования
window.SVGInjector = SVGInjector;

// Автоматическая инициализация
new SVGInjector().init();