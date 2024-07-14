import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
           /* Primary Meta Tags */
            <title>Uriel Salischiker Portfolio - Senior Software Engineer</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Uriel Salischiker - Senior Software Engineer" />
            <meta name="description"
                content="Uriel Salischiker's (urielsalis) Personal Portfolio Website." />
            <meta name="author" content="Uriel Salischiker (urielsalis)" />
            <meta name="keywords"
                content="urielsalis, urielsalis's portfolio, Uriel Salischiker" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />

            /* Search Engine */
            <meta name="image" content="images/logos/fevicon.png" />
            /* Schema.org for Google */
            <meta itemProp="name" content="Uriel Salischiker - Senior Software Engineer" />
            <meta itemProp="description"
                content="Uriel Salischiker's (urielsalis) Personal Portfolio Website." />
            <meta itemProp="image" content="images/logos/fevicon.png" />
            /* Twitter */
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="Uriel Salischiker - Senior Software Engineer" />
            <meta name="twitter:description"
                content="Uriel Salischiker's (urielsalis) Personal Portfolio Website." />
            <meta name="twitter:site" content="urielsalis" />
            <meta name="twitter:creator" content="urielsalis" />
            <meta name="twitter:image:src" content="images/logos/logo_1024.png" />
            /* Open Graph general (Facebook, Pinterest & Google+) */
            <meta name="og:title" content="Uriel Salischiker - Senior Software Engineer" />
            <meta name="og:description"
                content="Uriel Salischiker's (urielsalis) Personal Portfolio Website." />
            <meta name="og:image" content="images/logos/logo_1200.png" />
            <meta name="og:url" content="http://urielsalis.com/" />
            <meta name="og:site_name" content="Uriel Salischiker Personal Portfolio" />
            <meta name="og:locale" content="en_US" />
            <meta name="og:type" content="website" />

            <link rel="icon" href="images/logos/fevicon.svg" />
            <link rel="apple-touch-icon" href="images/logos/logo.png" />
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
    )
}
