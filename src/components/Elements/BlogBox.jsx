import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

export default function BlogBox({ tag, title, text, action, author, image, rating = 0, isOnline = false }) {
  return (
    <WrapperBtn className="animate pointer" onClick={action ? () => action() : null}>
      <Wrapper className="whiteBg radius8 shadow">
        <AuthorRow>
          <ProfileWrapper>
            {image && <ProfileImg src={image} alt="Profile" />}
            <StatusDot isOnline={isOnline} />
          </ProfileWrapper>
        </AuthorRow>
        <ContentWrapper>
          <TextWrapper>
            <h3 className="font20 extraBold">{title}</h3>
            <p className="font13" style={{ padding: '10px 0' }}>
              {text}
            </p>

            {/* Author and Online Status */}
            <AuthorText>{author}</AuthorText>
            <Tag>{tag}</Tag>
            <StarRating>
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="star" color={index < rating ? '#ffc107' : '#e4e5e9'} />
              ))}
            </StarRating>
          </TextWrapper>
        </ContentWrapper>
      </Wrapper>
    </WrapperBtn>
  );
}

// Styled Components
const WrapperBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  width: 23%;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 1200px) {
    width: 31%;
    padding: 10px;
  }

  @media (max-width: 860px) {
    width: 45%;
    line-height: 1.2;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 10px;

  @media (max-width: 860px) {
    padding: 2px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  padding: 10px;
  min-height: 250px;

  @media (max-width: 860px) {
    min-height: 150px;
  }
`;



const TextWrapper = styled.div`
  flex: 1;
  min-width: 150px;
  text-align: center;
  padding: 0px 0px;
`;

const AuthorRow = styled.div` 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: inline-block; /* Wraps tight around the image */
`;
const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
`;
const StatusDot = styled.div`
  position: absolute;
  top: 5px; /* Adjust this value to move dot vertically */
  right: 10px; /* Adjust this value to move dot horizontally */
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid white; /* Optional: adds a border around the dot */
  background-color: ${({ isOnline }) => (isOnline ? 'rgb(59, 246, 87)' : 'red')};
`;

const Tag = styled.p`
  background-color: coral;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  display: inline-block;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  flex-wrap: wrap;

  .star {
    margin-right: 5px;
  }

  @media (max-width: 860px) {
    padding: 2px;
  }
`;

const AuthorText = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;
