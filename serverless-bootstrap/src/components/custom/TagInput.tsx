import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import AutocompleteDropdown from './AutoCompleteDropdown';

type TagInputProps = {
  label?: string;
  options?: string[];
  onTagsChange: (tags: string[]) => void; // Callback function from parent
};

const TagInput: FC<TagInputProps> = (props: TagInputProps) => {
  const { label = '', options = [], onTagsChange } = props;
  const [tags, setTags] = useState<string[]>([]);
  const [filteredOptions, setFilterOptions] = useState<string[]>(options);
  const [enabled, setEnabled] = useState<boolean>(true);

  const removeTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    onTagsChange(updatedTags);
    setFilterOptions((prevOptions) => [...prevOptions, tag]);
  };

  const onSelect = (tag: string) => {
    if (tag && options.includes(tag) && !tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      onTagsChange(updatedTags);
      setFilterOptions((prevOptions) => prevOptions.filter((o) => o !== tag));
    }
  };

  useEffect(() => {
    if (filteredOptions.length > 0) setEnabled(true);
    else setEnabled(false);
  }, [filteredOptions]);

  return (
    <div>
      {enabled && (
        <AutocompleteDropdown
          label={label}
          options={filteredOptions}
          onSelect={onSelect}
          enabled={enabled}
        />
      )}

      <div className="d-flex flex-wrap mb-2 mt-2 mr-2">
        {tags.map((tag, idx) => (
          <div key={idx} className="mr-1 mt-1">
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
