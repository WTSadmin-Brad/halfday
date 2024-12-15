import styled from 'styled-components';

interface RadialDarknessProps {
  opacity?: number;
  zIndex?: number;
}

const DarknessOverlay = styled.div<RadialDarknessProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    rgba(0, 0, 0, ${props => props.opacity || 0.3}) 100%
  );
  z-index: ${props => props.zIndex || 1};
`;

export const RadialDarkness: React.FC<RadialDarknessProps> = ({ opacity, zIndex }) => {
  return <DarknessOverlay opacity={opacity} zIndex={zIndex} />;
};

export default RadialDarkness;