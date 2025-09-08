import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach(elementName => {
        if (elements[elementName]) {
            // Добавляем опцию "Все"
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Все';
            elements[elementName].appendChild(defaultOption);
            
            // Добавляем опции из indexes
            Object.values(indexes[elementName]).forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                elements[elementName].appendChild(option);
            });
        }
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear' && action.dataset.field) {
            const fieldName = action.dataset.field;
            if (elements[fieldName]) {
                elements[fieldName].value = '';
                state[fieldName] = '';
            }
        }

        console.log('Filtering state:', state);
        
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(item => compare(item, state));
    }
}