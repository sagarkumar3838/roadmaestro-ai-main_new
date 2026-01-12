import React, { FC } from 'react';
import styled from 'styled-components';

interface TooltipProps {
  children: React.ReactNode;
  content?: string;
  title?: string;
}

// If you want to add props in the future, define an interface here
const Tooltip: FC<TooltipProps> = ({ children, content, title }) => {
  return (
    <StyledWrapper>
      <div style={{ position: 'relative' }}>
        {children}
        <div className="cyber-tooltip">
          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
          {title && <strong>{title}</strong>}
          {title && content && <br />}
          {content || (
            <>
              <strong>SYSTEM READY</strong><br />
              Authorization required for neural interface activation. Security protocol enabled.
            </>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cyber-tooltip {
    position: absolute;
    width: 220px;
    padding: 20px;
    background: rgba(15, 15, 35, 0.95);
    border: 1px solid rgba(0, 231, 255, 0.5);
    color: #00e7ff;
    font-size: 14px;
    line-height: 1.5;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s;
    box-shadow: 0 0 30px rgba(0, 231, 255, 0.2);
    text-shadow: 0 0 8px rgba(0, 231, 255, 0.5);
    z-index: 10;

    clip-path: polygon(
      0% 20%,
      10% 0%,
      90% 0%,
      100% 20%,
      100% 80%,
      90% 100%,
      10% 100%,
      0% 80%
    );

    background-image: linear-gradient(rgba(0, 231, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 231, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;

    bottom: calc(100% + 20px);
    left: 50%;
    transform: translateX(-50%);
  }

  /* Show tooltip on hover */
  & > div:hover .cyber-tooltip {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) translateY(-10px);
  }

  @keyframes scan {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    20%,
    80% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  .cyber-tooltip::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00e7ff, transparent);
    box-shadow: 0 0 10px #00e7ff;
    animation: scan 2s infinite;
  }

  .cyber-tooltip .corner-tl {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 10px;
    height: 10px;
    border: 1px solid #00e7ff;
    box-shadow: 0 0 5px #00e7ff;
    border-right: none;
    border-bottom: none;
  }

  .cyber-tooltip .corner-tr {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 10px;
    height: 10px;
    border: 1px solid #00e7ff;
    box-shadow: 0 0 5px #00e7ff;
    border-left: none;
    border-bottom: none;
  }

  .cyber-tooltip .corner-bl {
    position: absolute;
    bottom: 5px;
    left: 5px;
    width: 10px;
    height: 10px;
    border: 1px solid #00e7ff;
    box-shadow: 0 0 5px #00e7ff;
    border-right: none;
    border-top: none;
  }

  .cyber-tooltip .corner-br {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 10px;
    height: 10px;
    border: 1px solid #00e7ff;
    box-shadow: 0 0 5px #00e7ff;
    border-left: none;
    border-top: none;
  }

  /* Hover effect for any button-like elements */
  button:hover {
    text-shadow: 0 0 12px rgba(0, 243, 255, 0.8);
    letter-spacing: 1px;
  }

  button::before,
  button::after {
    content: "";
    position: absolute;
    width: 0;
    height: 1px;
    background: #00f3ff;
    box-shadow: 0 0 5px #00f3ff;
    transition: all 0.3s;
  }

  button::before {
    top: 0;
    left: 0;
  }

  button::after {
    bottom: 0;
    right: 0;
  }

  button:hover::before,
  button:hover::after {
    width: 100%;
  }
`;

export default Tooltip;
