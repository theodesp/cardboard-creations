import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Footer, Header, Hero, ServiceGrid } from "components";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import { client } from "client";
/* eslint-disable @next/next/no-img-element */
import { getNextStaticProps } from "@faustjs/next";
import styles from "scss/pages/home.module.scss";

export default function Page({}) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const faqs = useQuery().fAQs()?.nodes;

  return (
    <>
      <Header description={generalSettings.description} />

      <Head>
        <title>FAQs - {generalSettings.title}</title>
      </Head>

      <Hero title="FAQs" bgImage="/images/headless_hero_background.jpg" />

      <main className="content content-single">
        <div className="wrap">
          <h3>FAQs</h3>
          {faqs.map((faq, index) => {
            return (
              <Accordion key="index">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    className="answer"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  ></div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
        <section className={styles.explore}>
          <ServiceGrid />
        </section>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
