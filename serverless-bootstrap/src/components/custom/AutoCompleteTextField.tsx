import { FC, useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import FormLabel from 'react-bootstrap/FormLabel';

type AutoCompleteTextFieldProps = {
  label?: string;
  id: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
};

const AutoCompleteTextField: FC<AutoCompleteTextFieldProps> = (
  props: AutoCompleteTextFieldProps
) => {
  const { id, options, value = '', setValue = () => {}, label = '' } = props;
  const [show, setShow] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  const onValueSelected = (selectedName: string) => {
    setShow(false);
    setValue(selectedName);
  };

  const onFocus = () => {
    setShow(true);
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
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setShow(false);
        if (value && !filteredOptions.includes(value)) {
          setValue('');
        } else {
          setValue(value);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [value]);

  const renderOptions = () => {
    if (filteredOptions.length > 0) {
      return filteredOptions.slice(0, 20).map((result, index) => (
        <ListGroup.Item
          key={index}
          className="typeahead-list-group-item"
          onClick={() => onValueSelected(result)}
        >
          {result}
        </ListGroup.Item>
      ));
    } else {
      return (
        <ListGroup.Item key="na" className="typeahead-list-group-item">
          No results found
        </ListGroup.Item>
      );
    }
  };

  return (
    <div className="App" ref={componentRef} id={id}>
      {label && <FormLabel htmlFor="dropdown-autocomplete">{label}</FormLabel>}

      <Form.Group
        className="typeahead-form-group"
        style={{ position: 'relative' }}
      >
        <Form.Control
          type="text"
          autoComplete="off"
          onChange={(e) => setValue(e.target.value)}
          onFocus={onFocus}
          value={value}
          placeholder="Enter options..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const currentValue = (e.target as HTMLInputElement).value;
              validateInput(currentValue);
              e.preventDefault();
            }
          }}
        />
        <ListGroup
          className="position-absolute w-100 bg-white border border-secondary rounded"
          style={{ top: '100%', zIndex: 1050 }}
        >
          {show && renderOptions()}
        </ListGroup>
      </Form.Group>
    </div>
  );
};

export default AutoCompleteTextField;
