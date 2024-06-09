
import { renderToString } from 'react-dom/server';
import { createAbsoluteUrl } from '@server/lib'


export const emailTemplate = (props) => {

  const { email, id, url, enquiry, title } = props
  const fullUrl = createAbsoluteUrl(url)

  return renderToString(<>
    <h3>
      <a href={fullUrl} target="_blank">REF: #{id}</a></h3>
    <h4>Web enquiry from: {email}</h4>
    <br />
    <br />

    <div style={{ fontStyle: 'italic', backgroundColor: '#edeedd', padding: '20px' }}>
      {enquiry}
    </div>

    <br />
    <br />
    link: <a href={fullUrl} target="_blank">{fullUrl}</a><br />
    reply: <a href={`mailto:${email}?subject=${title}`}>reply</a>
  </>)
}