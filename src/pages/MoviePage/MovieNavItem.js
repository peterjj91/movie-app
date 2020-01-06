import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

function MovieNavItem({ title, text, onChange, match }) {
  return (
    <NavItem>
      <NavLink
        tag={RRNavLink}
        to={`/movie/${match.params.id}/${title}`}
        onClick={() => onChange(title)}
      >
        {text}
      </NavLink>
    </NavItem>
  );
}

MovieNavItem.propTypes = {
  match: PropTypes.object.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  onChage: PropTypes.func,
};

export default withRouter(MovieNavItem);
