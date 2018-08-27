import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { Motion, spring } from "react-motion";

const BlackBox = styled.div`
height: ${({ heightPrecentage }) => heightPrecentage}%
width: 100%;
background: #000;
transform-origin: ${({ to }) => to} center;
`;

class BlackBoxAnimator extends Component {
  render() {
    const { to, heightPrecentage, startAnimation } = this.props;
    return (
      <Motion
        defaultStyle={{ x: 1 }}
        style={{ x: startAnimation ? spring(0) : 1 }}
      >
        {({ x }) => (
          <BlackBox
            to={to}
            heightPrecentage={heightPrecentage}
            style={{ transform: `scaleX(${x})` }}
          />
        )}
      </Motion>
    );
  }
}

BlackBoxAnimator.propTypes = {
  to: PropTypes.string.isRequired,
  heightPrecentage: PropTypes.number.isRequired,
  startAnimation: PropTypes.bool.isRequired
};

BlackBoxAnimator.defaultProps = {
  to: "right",
  heightPrecentage: 10,
  startAnimation: false
};

export default BlackBoxAnimator;
