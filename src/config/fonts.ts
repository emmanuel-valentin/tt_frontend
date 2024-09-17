import { Roboto_Condensed, Roboto_Flex, Roboto_Mono } from 'next/font/google';

export const headingFont = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--heading-font',
});

export const bodyFont = Roboto_Flex({
  subsets: ['latin'],
  variable: '--body-font',
});

export const monoFont = Roboto_Mono({
  subsets: ['latin'],
  variable: '--mono-font',
});
