import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

// Adds a JSON-LD <script> to the page head (tracker #20).
export default function StructuredData({ data }) {
  // Escape "<" so text inside the data can never close the script tag.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <Helmet>
      <script type="application/ld+json">{json}</script>
    </Helmet>
  )
}

StructuredData.propTypes = {
  data: PropTypes.object.isRequired,
}
