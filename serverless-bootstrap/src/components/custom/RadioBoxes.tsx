import { FC } from 'react';
import Form from 'react-bootstrap/Form';

type RadioBoxesProps = {
  id: string;
  options: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
};

const RadioBoxes: FC<RadioBoxesProps> = (props: RadioBoxesProps) => {
  const {
    id = '',
    options,
    selectedValue = '',
    setSelectedValue = () => {},
  } = props;
  return (
    <Form id={id}>
      {options.map((option, index) => (
        <Form.Check
          key={index}
          type="radio"
          id={`radio-${id}-${index}`}
          label={option}
          value={option}
          checked={selectedValue === option}
          onChange={() => setSelectedValue(option)}
        />
      ))}
    </Form>
  );
};

export default RadioBoxes;
