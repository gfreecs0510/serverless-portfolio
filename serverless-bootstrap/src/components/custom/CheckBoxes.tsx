import { Dispatch, SetStateAction } from 'react';
import Form from 'react-bootstrap/Form';

type CheckBoxesType = {
  id: string;
  options: string[];
  checkedItems: string[];
  setCheckedItems: Dispatch<SetStateAction<string[]>>;
};

function CheckBoxes(props: CheckBoxesType) {
  const {
    id = '',
    options,
    checkedItems = [],
    setCheckedItems = () => {},
  } = props;

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems([...checkedItems, event.target.value]);
  };

  return (
    <Form id={id}>
      {options.map((o) => (
        <div key={`default-${o}`} className="mb-3">
          <Form.Check
            type="checkbox"
            id={`checkbox-${id}-${o}`}
            label={o}
            onChange={handleCheckChange}
            value={o}
            checked={checkedItems.includes(o)}
          />
        </div>
      ))}
    </Form>
  );
}

export default CheckBoxes;
