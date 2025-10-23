import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface KeyboardSimulationProps {
  isTyping: boolean;
  userInput: string;
  practiceText: string;
  showFingerGuide?: boolean;
}

interface KeyProps {
  keyChar: string;
  finger: string;
  isHighlighted: boolean;
  isPressed: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  width?: number;
}

const Key: React.FC<KeyProps> = ({ 
  keyChar, 
  finger, 
  isHighlighted, 
  isPressed, 
  isCorrect, 
  isIncorrect,
  width = 1 
}) => {
  const getKeyColor = () => {
    if (isIncorrect) return '#ffebee'; // Light red
    if (isCorrect) return '#e8f5e8'; // Light green
    if (isPressed) return '#1976d2'; // Blue when pressed
    if (isHighlighted) return '#fff3e0'; // Light orange when highlighted
    return '#ffffff'; // Default white
  };

  const getFingerColor = (finger: string) => {
    const fingerColors: {[key: string]: string} = {
      'left-pinky': '#f8bbd9',
      'left-ring': '#f8d7da',
      'left-middle': '#b3d7ff',
      'left-index': '#b8f5b8',
      'right-index': '#b8f5b8',
      'right-middle': '#b3d7ff',
      'right-ring': '#f8d7da',
      'right-pinky': '#f8bbd9',
      'thumb': '#e6ccff'
    };
    return fingerColors[finger] || '#f5f5f5';
  };

  return (
    <Paper
      elevation={isPressed ? 3 : 1}
      sx={{
        width: width * 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2px',
        cursor: 'default',
        backgroundColor: getKeyColor(),
        border: isHighlighted ? '2px solid #ff9800' : '1px solid #ddd',
        borderBottom: isPressed ? '1px solid #ddd' : '3px solid #ddd',
        transform: isPressed ? 'translateY(1px)' : 'none',
        transition: 'all 0.1s ease',
        position: 'relative',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: getFingerColor(finger),
          borderRadius: '2px 2px 0 0'
        }
      }}
    >
      <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
        {keyChar}
      </Typography>
    </Paper>
  );
};

const KeyboardSimulation: React.FC<KeyboardSimulationProps> = ({
  isTyping,
  userInput,
  practiceText,
  showFingerGuide = true
}) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [keyStates, setKeyStates] = useState<{[key: string]: 'correct' | 'incorrect' | 'neutral'}>({});

  // Keyboard layout with finger assignments
  const keyboardLayout = [
    // Number row
    [
      { key: '1', finger: 'left-pinky' },
      { key: '2', finger: 'left-ring' },
      { key: '3', finger: 'left-middle' },
      { key: '4', finger: 'left-index' },
      { key: '5', finger: 'left-index' },
      { key: '6', finger: 'right-index' },
      { key: '7', finger: 'right-index' },
      { key: '8', finger: 'right-middle' },
      { key: '9', finger: 'right-ring' },
      { key: '0', finger: 'right-pinky' },
    ],
    // Top row
    [
      { key: 'Q', finger: 'left-pinky' },
      { key: 'W', finger: 'left-ring' },
      { key: 'E', finger: 'left-middle' },
      { key: 'R', finger: 'left-index' },
      { key: 'T', finger: 'left-index' },
      { key: 'Y', finger: 'right-index' },
      { key: 'U', finger: 'right-index' },
      { key: 'I', finger: 'right-middle' },
      { key: 'O', finger: 'right-ring' },
      { key: 'P', finger: 'right-pinky' },
    ],
    // Home row
    [
      { key: 'A', finger: 'left-pinky' },
      { key: 'S', finger: 'left-ring' },
      { key: 'D', finger: 'left-middle' },
      { key: 'F', finger: 'left-index' },
      { key: 'G', finger: 'left-index' },
      { key: 'H', finger: 'right-index' },
      { key: 'J', finger: 'right-index' },
      { key: 'K', finger: 'right-middle' },
      { key: 'L', finger: 'right-ring' },
      { key: ';', finger: 'right-pinky' },
    ],
    // Bottom row
    [
      { key: 'Z', finger: 'left-pinky' },
      { key: 'X', finger: 'left-ring' },
      { key: 'C', finger: 'left-middle' },
      { key: 'V', finger: 'left-index' },
      { key: 'B', finger: 'left-index' },
      { key: 'N', finger: 'right-index' },
      { key: 'M', finger: 'right-index' },
      { key: ',', finger: 'right-middle' },
      { key: '.', finger: 'right-ring' },
      { key: '/', finger: 'right-pinky' },
    ]
  ];

  // Additional keys row
  const additionalKeys = [
    { key: 'SPACE', finger: 'thumb', width: 6 },
    { key: 'SHIFT', finger: 'left-pinky', width: 2 },
    { key: 'ENTER', finger: 'right-pinky', width: 2 }
  ];

  useEffect(() => {
    if (!isTyping) return;

    const nextCharIndex = userInput.length;
    if (nextCharIndex < practiceText.length) {
      // Update key states based on input
      const newKeyStates: {[key: string]: 'correct' | 'incorrect' | 'neutral'} = {};
      
      for (let i = 0; i < userInput.length; i++) {
        const expectedChar = practiceText[i].toUpperCase();
        const actualChar = userInput[i].toUpperCase();
        newKeyStates[expectedChar] = actualChar === expectedChar ? 'correct' : 'incorrect';
      }
      
      setKeyStates(newKeyStates);
    }
  }, [userInput, practiceText, isTyping]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTyping) return;
      
      const key = event.key.toUpperCase();
      setPressedKeys(prev => new Set([...prev, key]));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isTyping]);

  const getNextExpectedKey = (): string => {
    const nextCharIndex = userInput.length;
    if (nextCharIndex < practiceText.length) {
      return practiceText[nextCharIndex].toUpperCase();
    }
    return '';
  };

  const nextKey = getNextExpectedKey();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom align="center">
        🎹 Live Keyboard Simulation
      </Typography>
      
      {showFingerGuide && (
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: '#f8bbd9', borderRadius: '50%' }}></Box>
            <Typography variant="caption">Pinky</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: '#f8d7da', borderRadius: '50%' }}></Box>
            <Typography variant="caption">Ring</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: '#b3d7ff', borderRadius: '50%' }}></Box>
            <Typography variant="caption">Middle</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: '#b8f5b8', borderRadius: '50%' }}></Box>
            <Typography variant="caption">Index</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, backgroundColor: '#e6ccff', borderRadius: '50%' }}></Box>
            <Typography variant="caption">Thumb</Typography>
          </Box>
        </Box>
      )}

      {nextKey && (
        <Typography variant="body2" align="center" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
          Next Key: <span style={{ fontSize: '1.2rem', backgroundColor: '#fff3e0', padding: '2px 8px', borderRadius: '4px' }}>{nextKey}</span>
        </Typography>
      )}

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 2,
        borderRadius: 2,
        border: '1px solid #ddd'
      }}>
        {keyboardLayout.map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ display: 'flex', marginBottom: '4px' }}>
            {row.map(({ key, finger }, keyIndex) => (
              <Key
                key={`${rowIndex}-${keyIndex}`}
                keyChar={key}
                finger={finger}
                isHighlighted={key === nextKey}
                isPressed={pressedKeys.has(key) || pressedKeys.has(key.toLowerCase())}
                isCorrect={keyStates[key] === 'correct'}
                isIncorrect={keyStates[key] === 'incorrect'}
              />
            ))}
          </Box>
        ))}
        
        {/* Additional keys row */}
        <Box sx={{ display: 'flex', marginTop: '8px', justifyContent: 'center' }}>
          {additionalKeys.map(({ key, finger, width }) => (
            <Key
              key={key}
              keyChar={key}
              finger={finger}
              isHighlighted={key === nextKey || (key === 'SPACE' && nextKey === ' ')}
              isPressed={pressedKeys.has(key) || (key === 'SPACE' && pressedKeys.has(' '))}
              width={width}
            />
          ))}
        </Box>
      </Box>

      <Typography variant="caption" align="center" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
        💡 Watch the highlighted key and use the correct finger (shown by the colored bar)
      </Typography>
    </Box>
  );
};

export default KeyboardSimulation;