import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg
      viewBox="0 0 32.00 32.00"
      id="OBJECT"
      xmlns="http://www.w3.org/2000/svg"
      fill="#52dee0"
      stroke="#52dee0"
      transform="rotate(0)"
      strokeWidth="0.00032"
          width="52px"
      height="52px"
      {...props}
    >
      {/* You can safely remove SVGRepo groups unless you need them */}
      <g strokeWidth="0"></g>

      {/* Tracer carrier (optional) */}
      <g strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.408">
        <path
          d="M30.87,21.8l-9.23-16a1,1,0,0,0-.92-.49l-8.23.49a1,1,0,0,0-.78.45L7.17,13.15a1,1,0,0,0,0,1l9.23,16a1,1,0,0,0,.6.46,1.17,1.17,0,0,0,.26,0,1,1,0,0,0,.5-.14L30.5,23.16A1,1,0,0,0,30.87,21.8Z"
          fill="#b2b2b2"
        />
        <path
          d="M18.45,9.11l-8-4a1,1,0,0,0-.9,0l-8,4A1,1,0,0,0,1,10V30a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V10A1,1,0,0,0,18.45,9.11Z"
        />
        <circle cx="10" cy="12" r="3" fill="#b2b2b2" />
        <path d="M11,20H6a1,1,0,0,1,0-2h5a1,1,0,0,1,0,2Z" fill="#b2b2b2" />
        <path d="M14,23.5H6a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z" fill="#b2b2b2" />
        <path d="M14,27H6a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z" fill="#b2b2b2" />
        <path d="M10,11a1,1,0,0,1-1-1V2a1,1,0,0,1,2,0v8A1,1,0,0,1,10,11Z" fill="#b2b2b2" />
      </g>
    </svg>
  );
}

export default SvgComponent;
