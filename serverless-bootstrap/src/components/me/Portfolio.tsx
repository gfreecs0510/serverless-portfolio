import SideBar from '../custom/SideBar';
import { SearchFilters } from '../job-search/SearchFilters';

function Portfolio() {
  return <SideBar children={<SearchFilters />} />;
}

export { Portfolio };
