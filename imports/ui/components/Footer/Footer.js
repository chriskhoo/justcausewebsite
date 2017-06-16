import React from 'react';
import { year } from '@cleverbeagle/dates';

import './Footer.scss';

const copyrightYear = () => {
  return currentYear = year();
};

const Footer = () => (
  <div className="Footer">
    <p className="text-center">&copy; {copyrightYear()} JustCause</p>
  </div>
);

Footer.propTypes = {};

export default Footer;
