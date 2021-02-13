import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

const ImageDiv = styled.div`
  width: 100%;
  margin: 0px;
  padding: 0px;
  min-height: 200px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
`;

class CarouselCommon extends Component {
  componentDidMount = ()=>{
    console.log(this.props)
  }
  render() {
    // var urlCreator = window.URL || window.webkitURL;
    return (
      <Carousel>
        {this.props.files.map((file) => <ImageDiv><Image src={ typeof file === 'string' ? file: URL.createObjectURL(file)} /></ImageDiv>)}
      </Carousel>
    );
  }
};
export default CarouselCommon