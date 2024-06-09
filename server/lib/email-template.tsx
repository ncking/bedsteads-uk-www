import { renderToString } from 'react-dom/server'
/*

  "react": ["node_modules/preact/compat"],
  "react-dom/test-utils": ["node_modules/preact/test-utils"],
  "react-dom": ["node_modules/preact/compat"],
  "react-ssr-prepass": ["node_modules/preact/preact-ssr-prepass"],
  */
export const emailTemplate = (props) => {
  const { email, enquiry, id, url, title } = props

  return renderToString(
    <>
      <h3>
        <a href={url} target="_blank">
          REF: #
          {id}
        </a>
      </h3>
      <h4>
        Web enquiry from:
        {email}
      </h4>
      <br />
      <br />

      <div style={{ fontStyle: 'italic', backgroundColor: '#edeedd', padding: '20px' }}>
        {enquiry}
      </div>

      <br />
      <br />
      link:
      {' '}
      <a href={url} target="_blank">{url}</a>
      <br />
      reply:
      {' '}
      <a href={`mailto:${email}?subject=${title}`}>reply</a>
    </>,
  )
}
