import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы
    const beforeTemplates = [];
    if(before && before.length > 0){
        before.reverse().forEach(templateID => {
            const template = cloneTemplate(templateID);
            root.container.prepend(template.container);
            beforeTemplates.push(template);
        });
    }
    root.before = beforeTemplates;

    const afterTemplates = [];
    if (after && after.length > 0) {
        after.forEach(templateId => {
            const template = cloneTemplate(templateId);
            root.container.append(template.container);
            afterTemplates.push(template);
        });
    }

    root.after = afterTemplates;

    // @todo: #1.3 —  обработать события и вызвать onAction()

    root.container.addEventListener('change', (e) => {
        onAction(e.target); 
    });

    // Обработка события reset
    root.container.addEventListener('reset', (e) => {
        setTimeout(() => onAction(e.target)); 
    });

    // Обработка события submit
    root.container.addEventListener('submit', (e) => {
        e.preventDefault();
        onAction(e.submitter); 
    });

    const render = (data) => {
        // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate
        const nextRows = data.map((item) => {
            const row = cloneTemplate(rowTemplate)
            Object.keys(item).forEach(key => {
                if (row.elements && row.elements[key]) {
                    row.elements[key].textContent = item[key];
                }
             })
        return row.container;
        });
        root.elements.rows.replaceChildren(...nextRows);
    }

    return {...root, render};
}