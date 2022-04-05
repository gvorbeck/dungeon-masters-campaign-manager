/* eslint-disable import/prefer-default-export */
import React from 'react';
import TopLayout from './components/TopLayout/TopLayout';

export const wrapRootElement = ({ element }) => <TopLayout>{element}</TopLayout>;
