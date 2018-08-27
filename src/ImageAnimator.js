import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BlackBoxAnimator from "./BlackBoxAnimator";

const ImageBox = styled.div`
  background: url(${({ imageUrl }) => imageUrl});
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-size: cover;
`;

class ImageAnimator extends Component {
  state = { animationNumber: 0, startAnimation: false };

  startNextAnimation = ms =>
    setTimeout(() => {
      if (this.state.animationNumber > this.props.animationRows) return;
      this.setState(state => ({
        animationNumber: state.animationNumber + 1
      }));
      this.startNextAnimation(ms);
    }, ms);

  componentDidMount = () => {
    const { startAnimation } = this.props;
    this.setState({ startAnimation: startAnimation });
    if (startAnimation) this.startNextAnimation(this.props.animationMs);
  };

  static getDerivedStateFromProps = (nextProp, prevState) => {
    if (nextProp.startAnimation !== prevState.startAnimation)
      return {
        startAnimation: nextProp.startAnimation,
        animationNumber: 0
      };
    else return null;
  };

  componentDidUpdate = () =>
    this.props.startAnimation &&
    this.startNextAnimation(this.props.animationMs);

  render() {
    const { animationRows, imageUrl, width, height } = this.props;
    const { animationNumber } = this.state;
    const heightPrecentage = 100 / animationRows;
    return (
      <ImageBox imageUrl={imageUrl} width={width} height={height}>
        {[...Array(animationRows).keys()].map(key => (
          <BlackBoxAnimator
            key={key}
            to={key % 2 ? "left" : "right"}
            heightPrecentage={heightPrecentage}
            startAnimation={animationNumber > key}
          />
        ))}
      </ImageBox>
    );
  }
}

ImageAnimator.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  animationRows: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  animationMs: PropTypes.number.isRequired,
  startAnimation: PropTypes.bool.isRequired
};

ImageAnimator.defaultProps = {
  imageUrl: "https://via.placeholder.com/300x200",
  animationRows: 4,
  width: 600,
  height: 400,
  animationMs: 250,
  startAnimation: true
};
export default ImageAnimator;
