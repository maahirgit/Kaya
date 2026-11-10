import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { absoluteUrl } from '../config/site';

const DEFAULT_IMAGE = '/kaya-logo.png';

export default function SEO({ title, description, keywords, path, image = DEFAULT_IMAGE, noindex = false }) {
  const url = path ? absoluteUrl(path) : null;
  // encodeURI: some photo file names contain spaces (e.g. "K-8507-B GREEN.jpg").
  const imageUrl = encodeURI(image.startsWith('http') ? image : absoluteUrl(image));

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  // Site-relative path, e.g. "/collection/abhinetri". Builds og:url and the canonical tag.
  path: PropTypes.string,
  // Site-relative or absolute image URL.
  image: PropTypes.string,
  noindex: PropTypes.bool,
};
