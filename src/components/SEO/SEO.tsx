import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO = ({ 
  title, 
  description = "En fysisk tidskrift och mötesplats för nyskriven dramatik på svenska, norska och danska. Beställ nummer, sök till vårt Open Call eller prenumerera på vårt nyhetsbrev.",
  image = "https://rumfordramatik.se/share.jpg", 
  url = window.location.href 
}: SEOProps) => {
  const siteTitle = title === "Hem" 
    ? "Rum för Dramatik - Tidskrift för nyskriven dramatik" 
    : `${title} | Rum för Dramatik`;

  return (
    <Helmet>
      {/* --- Standard Metadata --- */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* --- Open Graph (Facebook / LinkedIn) --- */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* --- Twitter Cards --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};