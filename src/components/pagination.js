import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    let pageCount;

    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;

        // @todo: #2.6 — обработать действия
        if (action) switch(action.name) {
            case 'prev': page = Math.max(1, page - 1); break;
            case 'next': page = page + 1; break;
            case 'first': page = 1; break;
            case 'last': page = pageCount || 1; break;
        }

        return Object.assign({}, query, {
            limit,
            page
        });
    }

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);

        if (pageCount > 0) {
            page = Math.min(page, pageCount);
            page = Math.max(page, 1);
        }

        // @todo: #2.4 — получить список видимых страниц и вывести их
        const visiblePages = pageCount > 0 ? getPages(page, pageCount, 5) : [1];
        pages.replaceChildren(...visiblePages.map(pageNumber => {
            const el = pageTemplate.cloneNode(true);
            return createPage(el, pageNumber, pageNumber === page);
        }))

        // @todo: #2.5 — обновить статус пагинации (обратите внимание, что rowsPerPage заменена на limit)
        const from = (page - 1) * limit + 1;
        const to = Math.min((page * limit), total);
        
        fromRow.textContent = total > 0 ? from : 0;
        toRow.textContent = total > 0 ? to : 0;
        totalRows.textContent = total;
    }

    return {
        updatePagination,
        applyPagination
    };
}