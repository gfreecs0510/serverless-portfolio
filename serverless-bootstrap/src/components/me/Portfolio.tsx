import AutocompleteDropdown from '../custom/AutoCompleteDropdown';
import SearchFiltersSideBar from '../job-search/SearchFiltersSideBar';

function Portfolio() {
  return (
    <div className="w-100">
      <SearchFiltersSideBar />
      <AutocompleteDropdown options={['a', 'b']} />
    </div>
  );
}

export { Portfolio };
