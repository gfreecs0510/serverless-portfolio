import { FC, useState, useRef, useEffect } from 'react';
import { Dropdown, FormControl, FormLabel } from 'react-bootstrap';

type AutocompleteDropdownProps = {
  id: string;
  options: string[];
  label?: string;
  overlay?: boolean;
  value: string;
  setValue: (val: string) => void;
};

const AutocompleteDropdown: FC<AutocompleteDropdownProps> = ({
  options = [],
  label = '',
  overlay = false,
  value = '',
  setValue = () => {},
  id = '',
}) => {
  const [show, setShow] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  const handleSelect = (selectedOption: string) => {
    setValue(selectedOption);
    setShow(false);
  };

  const validateInput = (value: string) => {
    if (!filteredOptions.includes(value)) {
      setValue('');
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !overlay &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
        if (value && !filteredOptions.includes(value)) {
          setValue('');
        } else {
          setValue(value);
        }
      }
    };

    if (!overlay) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (!overlay) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [overlay, value]);

  return (
    <div id={`autocomplete-${id}`} ref={dropdownRef}>
      {label && <FormLabel htmlFor="dropdown-autocomplete">{label}</FormLabel>}

      {overlay && show && <div className="overlay" />}

      <Dropdown
        show={show}
        onToggle={(isOpen) => {
          if (filteredOptions.length > 0 && isOpen) {
            setShow(true);
          }
        }}
      >
        <Dropdown.Toggle id="dropdown-autocomplete" className="w-100">
          {filteredOptions.length > 0 ? value || 'Select' : 'Disabled'}
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100">
          <FormControl
            autoFocus
            placeholder="Type to search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const currentValue = (e.target as HTMLInputElement).value;
                validateInput(currentValue);
                e.preventDefault();
              }
            }}
          />

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, idx) => (
              <Dropdown.Item
                key={idx}
                onClick={() => handleSelect(option)}
                className="text-wrap"
              >
                {option}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No results found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default AutocompleteDropdown;
