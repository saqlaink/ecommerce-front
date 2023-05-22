import styled from 'styled-components';
import ProductBox from './ProductBox';
import { RevealWrapper } from 'next-reveal';

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products?.map((product, idx) => (
          <RevealWrapper key={product._id} delay={idx * 50}>
            <ProductBox
              {...product}
              wished={wishedProducts.includes(product._id)}
            />
          </RevealWrapper>
        ))}
    </StyledProductsGrid>
  );
}
