import { Helmet } from 'react-helmet-async';
import { seoData } from '../../data/seoData';

const SEO = ({ page = 'home' }) => {
  const data = seoData[page];

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
    </Helmet>
  );
};

export default SEO; 