import { FC, useState, useRef, useEffect } from 'react';
import { Dropdown, FormControl, FormLabel } from 'react-bootstrap';

type AutocompleteDropdownProps = {
  options: string[];
  label: string;
  enabled?: boolean;
  onSelect?: (value: string) => void;
  overlay?: boolean;
  maxWidth?: string;
  width?: string;
};

const AutocompleteDropdown: FC<AutocompleteDropdownProps> = ({
  options = [],
  label,
  enabled = true,
  onSelect = () => {},
  overlay = false,
  maxWidth = '500px',
  width = '500px',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (selectedOption: string) => {
    setInputValue(selectedOption);
    setShow(false);
    onSelect(selectedOption);
  };

  const validateInput = (value: string) => {
    if (!options.includes(value)) {
      setInputValue('');
      setShow(true);
    } else {
      setShow(false);
      onSelect(value);
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
        if (inputValue && !filteredOptions.includes(inputValue)) {
          onSelect('');
          setInputValue('');
        } else {
          onSelect(inputValue);
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
  }, [show, overlay, inputValue, onSelect]);

  useEffect(() => {
    setInputValue('');
  }, [options]);

  return (
    <div ref={dropdownRef}>
      <FormLabel htmlFor="dropdown-autocomplete">{label}</FormLabel>

      {overlay && show && <div className="overlay" />}

      <Dropdown
        show={show}
        onToggle={(isOpen) => {
          if (options.length > 0 && enabled && isOpen) {
            setShow(true);
          }
        }}
      >
        <Dropdown.Toggle id="dropdown-autocomplete" style={{ width, maxWidth }}>
          {options.length > 0 && enabled ? inputValue || 'Select' : 'Disabled'}
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100">
          <FormControl
            autoFocus
            placeholder="Type to search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
