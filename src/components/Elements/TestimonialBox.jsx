import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import QuoteIcon from "../../assets/svg/Quotes";

export default function TestimonialBox({ text, author, rating = 5 }) {
  return (
    
    <Wrapper className="darkBg radius8 flexNullCenter flexColumn">
      <QuoteWrapper>
        <QuoteIcon />
      </QuoteWrapper>

      <TestimonialText>{text}</TestimonialText>

      <AuthorWrapper>
        <AuthorText><em>{author}</em></AuthorText>
        <StarsWrapper>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              color={i < rating ? "#ffc107" : "#e4e5e9"}
              size={14}
            />
          ))}
        </StarsWrapper>
      </AuthorWrapper>
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  padding: 20px;
  background-color:rgb(8, 69, 10);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
      @media (max-width: 860px) {
    height: 250px;
  }
`;

const QuoteWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;


`;

const TestimonialText = styled.p`
  font-size: 13px;
  line-height: 1.4;
  margin-top: 20px;
  flex: 1;
`;

const AuthorWrapper = styled.div`
  display: flex;
  flex-direction:
  justify-content: flex-end;
  margin-top: 15px;
  gap: 20px;
  
`;

const AuthorText = styled.p`
  color: #ffa500;
  font-size: 13px;
  margin-bottom: 8px;
`;

const StarsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 4px;
`;
