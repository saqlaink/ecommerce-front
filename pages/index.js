import { Product } from '@/models/Product';
import { WishedProduct } from '@/models/WishedProduct';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Setting } from '@/models/Setting';
import { mongooseConnect } from '@/lib/mongoose';
import dynamic from 'next/dynamic';

import Featured from '@/components/Featured';
import Header from '@/components/Header';

const NewProducts = dynamic(() => import('@/components/NewProducts'));
// import NewProducts from '@/components/NewProducts';

export default function Home({
  featuredProduct,
  newProducts,
  wishedNewProducts,
}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({
    name: 'featuredProductId',
  });
  // const featuredProductId = '6460d3754c127b337fef6a44';
  const featuredProductId = featuredProductSetting.value;

  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  };
}
