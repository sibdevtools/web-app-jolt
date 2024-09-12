import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'hugeicons-react'
import { JoltTransformer } from './componenets';

import 'ace-builds/src-noconflict/mode-json';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver';

import { ThemeProvider } from './theme/ThemeContext';


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <JoltTransformer />
    </ThemeProvider>
  );
};

export default App;
