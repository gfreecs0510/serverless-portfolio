import { SearchFilters } from './components/SearchFilters';

const jobTitles = [
  'Software Developer',
  'Frontend Developer',
  'Backend Developer',
  'Product Manager',
  'UX/UI Designer',
  'Data Scientist',
  'Marketing Manager',
  'DevOps Engineer',
];

function App() {
  return (
    <div>
      <SearchFilters options={jobTitles} />
    </div>
  );
}

export default App;
