import './SEOHead.css';
import { Helmet } from 'react-helmet-async';

export default function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
}) {
  const canonical = url || (typeof window !== 'undefined' ? window.location.href : '');
  const metaTitle = title || 'Karagiri';
  const metaDescription = description || 'Where craft finds its people.';

  const productSchema = type === 'product' ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: metaTitle,
    description: metaDescription,
    image: image ? [image] : undefined,
  } : null;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      {image && <meta property="og:image" content={image} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Karagiri" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
    </Helmet>
  );
}
