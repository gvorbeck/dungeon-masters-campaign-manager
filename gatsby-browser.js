/* eslint-disable import/prefer-default-export */
import React from 'react';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/utils';
import TopLayout from './components/TopLayout/TopLayout';

ClassNameGenerator.configure((componentName) => componentName.replace('Mui', 'dmcm-'));

export const wrapRootElement = ({ element }) => <TopLayout>{element}</TopLayout>;
