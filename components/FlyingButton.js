import styled from 'styled-components';
import { ButtonStyle } from './Button';
import { primary } from '@/lib/colors';

import { useContext, useEffect, useRef } from 'react';
import { CartContext } from './CartContext';

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};
    ${(props) =>
      props.main
        ? `
    background-color: ${primary};
    color: white;
    `
        : `
        background-color: transparent;
        border: 1px solid ${primary};
        color: ${primary};
    `}
    ${(props) =>
      props.white &&
      `
      background-color: white;
      border: 1px solid white;
    `}
  }
  @keyframes fly {
    100% {
      top: 0;
      left: 100%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-radius: 10px;
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imageRef = useRef();

  function sendImageToCart(e) {
    imageRef.current.style.display = 'inline-block';
    imageRef.current.style.left = e.clientX - 50 + 'px';
    imageRef.current.style.top = e.clientY - 50 + 'px';
    setTimeout(() => {
      imageRef.current.style.display = 'none';
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imageRef?.current?.closest('div[data-sr-id]');
      if (reveal?.style.opacity === '1') {
        reveal.style.transform = 'none';
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlyingButtonWrapper
        white={props.white}
        main={props.main}
        onClick={() => addProduct(props._id)}
      >
        <img src={props.src} alt="" ref={imageRef} />
        <button onClick={(e) => sendImageToCart(e)} {...props} />
      </FlyingButtonWrapper>
    </>
  );
}
