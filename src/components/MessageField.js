import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

import { pushMessage } from '../firebase';

const MessageField = ({ setText, text }) => {
  const [isComposed, setIsComposed] = useState(false);
  return (
    <TextField
      fullWidth
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => {
        const text = e.target.value;
        if (text === '') return;
        if (isComposed) return;
        if (e.key === 'Enter') {
          e.preventDefault();
          setText('');
          pushMessage({ name: 'sampleさん', text });
        }
      }}
      onCompositionStart={() => {
        setIsComposed(true);
      }}
      onCompositionEnd={() => {
        setIsComposed(false);
      }}
      value={text}
    />
  );
};

export default MessageField;