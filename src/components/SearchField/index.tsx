import SearchIcon from '@components/icons/SearchIcon';
import { Button, TextInput } from '@mantine/core';
import button_classes from '../../modules.styles/Button.module.css';

interface SearchFieldProps {
    value: string;
    setValue: (value: string) => void;
    onSearchSubmit: () => void;
}

export const SearchField = ({ value, setValue, onSearchSubmit }: SearchFieldProps) => (
    <TextInput
        onSubmit={onSearchSubmit}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
        placeholder='Search movie title'
        maw={490}
        w='100%'
        size='md'
        fz='xs'
        styles={{ input: { fontSize: '14px' } }}
        leftSection={<SearchIcon />}
        rightSection={
            <Button
                h={32}
                px='md'
                onClick={onSearchSubmit}
                classNames={{
                    root: button_classes.filledRoot,
                    section: button_classes.filledSection,
                    inner: button_classes.filledInner,
                    label: button_classes.filledLabel,
                }}
            >
                Search
            </Button>
        }
        rightSectionWidth={100}
    />
);
