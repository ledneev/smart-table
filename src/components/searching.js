import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    return (query, state, action) => { 
        return state[searchField] ? Object.assign({}, query, { 
            search: state[searchField] 
        }) : query; 
    }
}