export { Search } from './ui/Search/Search';

export {
	filterByName,
	filterByNameExtended,
	filterChatsLocal
} from './model/lib/filter/filterByNames/filterByName';
export { filterContacts } from './model/lib/filter/FilterByContacts/filterContacts';
export { filterByField } from './model/lib/filter/filterByFields/filterByField';

export { useLocalSearch } from './model/lib/hooks/UseLocalSearch/useLocalSearch';
export { useGlobalSearch } from './model/lib/hooks/useGlobalSearch/useGlobalSearch';
export { useHybridSearch } from './model/lib/hooks/useHybrydSearch/useHybridSearch';
