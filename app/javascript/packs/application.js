import React from 'react';
import { render } from 'react-dom';
import MainComponent from '../components/MainComponent';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.body.appendChild(document.createElement('div'));
  render(<MainComponent/>, container);
});

