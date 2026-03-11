import React from 'react';
import { Input, makeStyles } from '@fluentui/react-components';
import { SearchRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    width: '100%',
    maxWidth: '400px',
  },
});

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search by Flight ID, Name, or Experimentation ID...',
}) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Input
        value={value}
        onChange={(_, data) => onChange(data.value)}
        placeholder={placeholder}
        contentBefore={<SearchRegular />}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default SearchBar;
