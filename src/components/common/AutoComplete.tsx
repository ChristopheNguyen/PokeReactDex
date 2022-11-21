import { Box, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

interface AutoCompleteProps {
  label: string;
  suggestions: string[];
  onSelect?: (suggestion: string) => void;
}

const List = styled.ul`
  position: absolute;
  background-color: white;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: -2px;
  > li {
    list-style-type: none;
    left: 10px;
    padding: 15px;
    width: 250px;
    margin-left: -40px;
    :hover {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
  .suggestion-active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const AutoComplete: FC<AutoCompleteProps> = ({
  suggestions,
  label,
  onSelect,
}) => {
  const [activeSuggestion, setActiveSuggestion] =
    useState<number>(-1);
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<string[]>(suggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  // Init on new suggestions datas
  useEffect(() => {
    setFilteredSuggestions(suggestions);
    setActiveSuggestion(0);
    setShowSuggestions(false);
  }, [suggestions]);

  // Define Ref for handleClick Outside
  const boxRef = React.useRef<HTMLDivElement>();
  useEffect(() => {
    const handleClick = ({ target }: MouseEvent): void => {
      if (
        boxRef.current != null &&
        !boxRef.current.contains(target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [boxRef]);

  // Handle change on user input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const userInput = e.currentTarget.value;

    // Filter suggestions that don't contain the user's input
    const filteredSuggestions: string[] = suggestions.filter(
      (suggestion: string) =>
        suggestion.includes(userInput.toLowerCase())
    );

    setActiveSuggestion(-1);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(userInput);
  };

  // Handle click on list
  const handleClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    setActiveSuggestion(-1);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);

    // trigger onSelect handle from parent
    onSelect?.(e.currentTarget.innerText);
  };

  // Handle Keyboard on list
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === 'Enter') {
      if (activeSuggestion === -1) {
        return;
      }
      e.stopPropagation();
      // User pressed the enter key
      setActiveSuggestion(-1);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
    }

    // User pressed the up arrow
    if (e.key === 'ArrowUp') {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }

    // User pressed the down arrow
    if (e.key === 'ArrowDown') {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  return (
    <Box ref={boxRef}>
      <TextField
        label={label}
        variant="outlined"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={userInput}
        onFocus={() => {
          setActiveSuggestion(-1);
          setShowSuggestions(true);
          setUserInput('');
        }}
      />
      {showSuggestions && (
        <List>
          {filteredSuggestions.map((suggestion, index) => {
            if (showSuggestions) {
              return (
                <li
                  key={suggestion}
                  className={
                    index === activeSuggestion
                      ? 'suggestion-active'
                      : undefined
                  }
                  onClick={handleClick}
                >
                  {suggestion}
                </li>
              );
            }
            return null;
          })}
        </List>
      )}
    </Box>
  );
};
export default AutoComplete;
