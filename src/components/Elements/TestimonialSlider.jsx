import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import TestimonialBox from '../Elements/TestimonialBox';

export default function TestimonialSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        <LogoWrapper>
          <TestimonialBox
            text="FluxWriters saved my semester! Their essay was perfectly written and delivered ahead of schedule. I couldn’t be happier!"
            author="Emily Johnson"
            rating={5}
          />
        </LogoWrapper>
        <LogoWrapper>
          <TestimonialBox
            text="I was struggling with my research paper, but FluxWriters came through with an amazing piece. Highly recommend their services!"
            author="Michael Carter"
            rating={4}
          />
        </LogoWrapper>
        <LogoWrapper>
          <TestimonialBox
            text="The quality of work is outstanding, and the customer service is top-notch. I’ll definitely use FluxWriters again!"
            author="Sarah Thompson"
            rating={5}
          />
        </LogoWrapper>
        <LogoWrapper>
          <TestimonialBox
            text="I needed a last-minute essay, and FluxWriters delivered it in just 6 hours. It was flawless and saved my grade!"
            author="David Martinez"
            rating={3}
          />
        </LogoWrapper>
        <LogoWrapper>
          <TestimonialBox
            text="FluxWriters helped me with my dissertation, and I couldn’t have asked for better support. Their team is truly professional!"
            author="Jessica Lee"
            rating={4}
          />
        </LogoWrapper>
        <LogoWrapper>
          <TestimonialBox
            text="I’ve used FluxWriters for multiple assignments, and they’ve never disappointed. Their writers are experts in their fields!"
            author="Daniel Harris"
            rating={5}
          />
        </LogoWrapper>
      </Slider>
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  margin: 0 auto;
  padding: 10px 0;
  max-width: 1500px;

  .slick-slide {
    padding: 10px;
  }
`;

const LogoWrapper = styled.div`
  padding: 0 5%;
  cursor: pointer;

  :focus-visible {
    outline: none;
    border: 0px;
  }
`;
