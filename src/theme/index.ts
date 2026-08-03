import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 5,

  colors: {
    primary: [
      '#FBF7EB',
      '#F4E6C2',
      '#EAD08F',
      '#DDB85B',
      '#CF9F36',
      '#BE8827',
      '#A87621',
      '#91631B',
      '#744F15',
      '#573B0F',
    ],

    accent: [
      '#F8F6F2',
      '#EAE6DD',
      '#D9D2C5',
      '#C6BDAE',
      '#AFA595',
      '#8D887D',
      '#6D685E',
      '#4B473E',
      '#29261E',
      '#171511',
    ],

    success: [
      '#EDF7EF',
      '#D6ECD9',
      '#AEDAB3',
      '#85C78D',
      '#5CB467',
      '#3E7B4A',
      '#32653D',
      '#274F30',
      '#1B3922',
      '#102315',
    ],

    warning: [
      '#FFF8E8',
      '#FDEFC6',
      '#FBE39C',
      '#F8D66F',
      '#F4C94A',
      '#E09F1F',
      '#BE831A',
      '#996915',
      '#734F10',
      '#4E350B',
    ],

    danger: [
      '#FCEEEE',
      '#F6D4D4',
      '#EEAAAA',
      '#E47F7F',
      '#D95656',
      '#B23A3A',
      '#932F2F',
      '#742525',
      '#551A1A',
      '#360F0F',
    ],
  },

  black: '#29261E',
  white: '#FBFBF3',

  fontFamily: 'Google Sans, sans-serif',
  headings: {
    fontFamily: 'Outfit, Google Sans, sans-serif',
  },

  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '20px',
    xl: '32px',
  },

  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  shadows: {
    xs: '0 1px 2px rgba(0,0,0,.05)',
    sm: '0 2px 8px rgba(0,0,0,.08)',
    md: '0 8px 24px rgba(0,0,0,.10)',
    lg: '0 16px 40px rgba(0,0,0,.12)',
    xl: '0 24px 64px rgba(0,0,0,.16)',
  },

  defaultRadius: 'md',
});
