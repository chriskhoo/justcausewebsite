import React from 'react';
import { year } from '@cleverbeagle/dates';
import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import './Footer.scss';
const Footer = () => (
  <div className="Footer">
    <Grid>
      <p className="pull-left">&copy; JustCause {year()}</p>
      <p className="pull-right"><Link to="/terms">Terms of Service</Link></p>
    </Grid>
  </div>
);

export default Footer;
