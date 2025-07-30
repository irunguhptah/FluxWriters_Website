import React from 'react';
import styled from 'styled-components';
// Assets
import RollerIcon from '../../assets/svg/Services/RollerIcon';
import MonitorIcon from '../../assets/svg/Services/MonitorIcon';
import BrowserIcon from '../../assets/svg/Services/BrowserIcon';
import PrinterIcon from '../../assets/svg/Services/PrinterIcon';

export default function ServiceBox({ icon, title, subtitle }) {
  let getIcon;

  switch (icon) {
    case 'roller':
      getIcon = <RollerIcon />;
      break;
    case 'monitor':
      getIcon = <MonitorIcon />;
      break;
    case 'browser':
      getIcon = <BrowserIcon />;
      break;
    case 'printer':
      getIcon = <PrinterIcon />;
      break;
    default:
      getIcon = <RollerIcon />;
      break;
  }
  // Highlight Specific Keywords in Subtitle
  const highlightKeywords = (text) => {
    const keywords = [
      'high-quality papers',
      'originality',
      'clarity',
      'precision',
      'degree-holding writers',
      'top academic standards',
      'flawless formatting',
      'timely delivery',
      'exceptional results'
    ];

    let formattedText = text;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi'); // Case-insensitive match
      formattedText = formattedText.replace(regex, `<span class="highlight">${keyword}</span>`);
    });

    return formattedText;
  };

  return (
    <Wrapper>
      <Header>
        <IconStyle>{getIcon}</IconStyle>
        <TitleStyle className="font18 Bold">{title}</TitleStyle>
      </Header>

      {Array.isArray(subtitle) ? (
        <SubtitleList>
          {subtitle.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </SubtitleList>
      ) : (
        <SubtitleStyle className="font13" dangerouslySetInnerHTML={{ __html: highlightKeywords(subtitle) }} />
      )}
    </Wrapper>
  );
}

/* Styled Components */
const Wrapper = styled.div`
  width: 100%;
  text-align: left;
  
`;

const Header = styled.div`
  display: flex; /* ✅ Aligns icon and title side by side */
  align-items: center; /* ✅ Keeps them vertically centered */
  gap: 10px; /* ✅ Adds spacing between icon & title */
  margin-bottom: 10px;

`;

const IconStyle = styled.div`
  width: 40px; /* ✅ Adjust based on icon size */
  height: 40px;
`;

const TitleStyle = styled.h2`
  font-weight: bold;
  font-size: 17px;
  font-family: 'Poppins', sans-serif;

  margin: 0;
`;

const SubtitleStyle = styled.p`
  width: 100%;
  font-size: 16px;
  max-width: 300px;
  font-weight: 500;
  line-height: 1.6rem;
  margin-left: 5px ;
  .highlight {
    color: rgb(0, 0, 0); /* ✅ Shouting color */
    background-color: transparent;
    font-weight: 900;
    padding: 0;
  }
`;

const SubtitleList = styled.ul`
  list-style-type: disc;
  text-align: left;
  padding-left: 20px;
  max-width: 300px;
  margin: 0 auto;

  li {
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 5px;
  }
`;
