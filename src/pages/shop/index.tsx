/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { Footer, Header, Hero, Button } from "components";
import styles from "scss/pages/shop.module.scss";
import { getNextServerSideProps } from "@faustjs/next";
import _ from "lodash";
import { client } from "client";

export default function Page({ products = null }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const ccProducts: Product[] = products.products;

  return (
    <>
      <Header description={generalSettings.description} />

      <Head>
        <title>Shop - {generalSettings.title}</title>
      </Head>

      <Hero title="Shop" bgImage="images/home-promo-banner.jpeg" />

      <main className="content content-single">
        <div className="wrap">
          <h3>Products</h3>
          {_.chunk(ccProducts, 3).map((chunk: any[], chunkIdx: any) => (
            <div key={`row-${chunkIdx}`} className={styles.products}>
              {chunk.map((product, featureIdx) => (
                <div key={`feat-${featureIdx}`} className={styles.product}>
                  <div className={styles.productImage}>
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                    />
                  </div>
                  <p>€{product.price}</p>
                  <p>{product.name}</p>
                  <Button
                    buttonText="Details"
                    buttonURL={`/shop/${product.slug}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: products } = await axios.get(
    process.env.BASE_URL + "/api/woocommerce/products"
  );
  return getNextServerSideProps(context, {
    Page,
    client,
    props: {
      products,
    },
  });
}
