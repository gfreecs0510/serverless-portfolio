import { FC, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

type AutoCompleteTextFieldProps = {
  options: string[];
};

const AutoCompleteTextField: FC<AutoCompleteTextFieldProps> = (
  props: AutoCompleteTextFieldProps
) => {
  const { options } = props;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (e: any) => {
    const value: string = e.target.value;
    setName(value);
    setShow(false);
    if (value.length > 1) {
      const filtered = options.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(options);
    }
  };

  const onValueSelected = (selectedName: string) => {
    setName(selectedName);
    setShow(true);
    setSuggestions([]);
  };

  const onFocus = () => {
    setShow(true);
    setSuggestions(options);
  };

  return (
    <div className="App">
      <Form.Group className="typeahead-form-group">
        <Form.Control
          type="text"
          autoComplete="off"
          onChange={onChange}
          onFocus={onFocus}
          value={name}
        />
        <ListGroup className="typeahead-list-group">
          {!show &&
            suggestions.length > 0 &&
            suggestions.map((result, index) => (
              <ListGroup.Item
                key={index}
                className="typeahead-list-group-item"
                onClick={() => onValueSelected(result)}
              >
                {result}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Form.Group>
    </div>
  );
};

export default AutoCompleteTextField;
