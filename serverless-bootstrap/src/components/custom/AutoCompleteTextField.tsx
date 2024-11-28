import { FC, useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
//TODO: i need to enhance this, this one is much better
type AutoCompleteTextFieldProps = {
  options: string[];
};

const AutoCompleteTextField: FC<AutoCompleteTextFieldProps> = (
  props: AutoCompleteTextFieldProps
) => {
  const { options } = props;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const onChange = (e: any) => {
    const value: string = e.target.value;
    setValue(value);
    if (options.includes(value)) {
      setShow(false);
    } else {
      setShow(true);
      const filtered = options.filter((item) =>
        item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      if (filtered.length != 0) {
        setSuggestions(filtered);
      } else {
        setSuggestions(options);
      }
    }
  };

  const onValueSelected = (selectedName: string) => {
    setValue(selectedName);
    setSuggestions([]);
  };

  const onFocus = () => {
    setShow(true);
    setSuggestions(options);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setShow(false);
        setSuggestions([]);
        setValue(''); // Reset the input value when clicked outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, value, setSuggestions]);

  const renderSuggestions = () => {
    if (show) {
      return suggestions.map((result, index) => (
        <ListGroup.Item
          key={index}
          className="typeahead-list-group-item"
          onClick={() => onValueSelected(result)}
        >
          {result}
        </ListGroup.Item>
      ));
    }
  };

  return (
    <div className="App">
      <Form.Group className="typeahead-form-group">
        <Form.Control
          type="text"
          autoComplete="off"
          onChange={onChange}
          onFocus={onFocus}
          value={value}
        />
        <ListGroup className="typeahead-list-group">
          {renderSuggestions()}
        </ListGroup>
      </Form.Group>
    </div>
  );
};

export default AutoCompleteTextField;
