import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import AutocompleteDropdown from './AutoCompleteDropdown';

type TagInputProps = {
  id: string;
  label?: string;
  options: string[];
  tags: string[];
  setTags: (tags: string[]) => void;
};

const TagInput: FC<TagInputProps> = (props: TagInputProps) => {
  const {
    id = '',
    label = '',
    options = [],
    tags = [],
    setTags = () => {},
  } = props;
  const [filteredOptions, setFilterOptions] = useState<string[]>(options);
  const [enabled, setEnabled] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  const removeTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    setFilterOptions((prevOptions) => [...prevOptions, tag]);
  };

  const onSelect = (tag: string) => {
    if (tag && options.includes(tag) && !tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      setValue('');
      setTags(updatedTags);
      setFilterOptions((prevOptions) => prevOptions.filter((o) => o !== tag));
    } else {
      setValue(tag);
    }
  };

  useEffect(() => {
    if (filteredOptions.length > 0) setEnabled(true);
    else setEnabled(false);
  }, [filteredOptions]);

  return (
    <div id={id}>
      {enabled && (
        <AutocompleteDropdown
          id={id}
          label={label}
          options={filteredOptions}
          value={value}
          setValue={onSelect}
        />
      )}

      <div className="d-flex flex-wrap mb-2 mt-2 mr-2">
        {tags.map((tag, idx) => (
          <div key={`${id}-${idx}`} className="mr-1 mt-1">
            <Badge
              key={idx}
              pill
              className="d-inline-flex align-items-center mr-2"
              style={{
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <Button
                key={idx}
                variant="link"
                onClick={() => removeTag(tag)}
                style={{
                  padding: 0,
                  fontSize: '1.2rem',
                  marginRight: '5px',
                  color: 'white',
                }}
              >
                &times;
              </Button>
              {tag}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
