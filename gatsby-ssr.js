/* eslint-disable import/prefer-default-export */
import React from 'react';
import TopLayout from './src/components/TopLayout/TopLayout';

export const wrapRootElement = ({ element }) => <TopLayout>{element}</TopLayout>;
