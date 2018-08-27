import React, { Component } from "react";
import styled from "styled-components";

import ImageAnimator from "./ImageAnimator";

const Wrapper = styled.div``;

class App extends Component {
  state = { startAnimation: false };
  render() {
    return (
      <Wrapper>
        <button onClick={() => this.setState({ startAnimation: true })}>
          Start first box animation
        </button>
        <ImageAnimator
          animationRows={20}
          imageUrl="https://via.placeholder.com/600x400"
          width={600}
          height={400}
          animationMs={1}
          startAnimation={this.state.startAnimation}
        />
        <br />
        <ImageAnimator
          animationRows={20}
          imageUrl="https://via.placeholder.com/300x200"
          width={300}
          height={200}
          animationMs={10}
        />
      </Wrapper>
    );
  }
}

export default App;
