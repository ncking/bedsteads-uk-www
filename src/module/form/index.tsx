import { useEffect, useState } from 'react'
import { cx } from '@raiz/browser'
import { useForm } from '@raiz/react-simple-form'
import { TelLink, EmailLink } from '@components'
import { getThumbSrc } from '@lib'
import { createEnquiry } from './actions'
import { CloseBtn } from './close'
import * as formStyle from './form.scss'
import * as styles from './style.scss'

const RowTemplate = (props) => {
  const { field, fieldElement, errors } = props
  const { name, required, label = name } = field.getOptions()
  return (
    <div className={formStyle.fieldRow}>
      <label>
        {label}
        {required ? <i>*</i> : ''}
      </label>
      {fieldElement}
      <div className={formStyle.fieldError}>{errors}</div>
    </div>
  )
}

const ContactForm = ({ item }) => {
  const { id, images } = item
  const [success, setSuccess] = useState(null)

  const { Textarea, Field, Form, Submit, form } = useForm({
    template: RowTemplate,

    onSubmit(data) {
      data.id = id
      createEnquiry(data).then(({ success }) => setSuccess(success))
    },
  })

  useEffect(() => {
    setTimeout(() => form.setFocus('email'), 0)
  }, [form])

  if (!id || !images) {
    return null
  }

  let content
  if (success) {
    content = (
      <div className={formStyle.form}>
        <h2>Thank you for your enquiry.</h2>
        <p>
          We will get back to you as soon as possible.
          {' '}
          <br />
          We will reply no later than one working day
          <br />
          {' '}
          after your enquiry
        </p>
      </div>
    )
  }
  else if (false === success) {
    content = (
      <div className={formStyle.form}>
        <h2>Error sending enquiry.</h2>
        <p>Were looking into this.</p>
        <br />
        Please try again later or contact us:
        <TelLink></TelLink>
        <EmailLink></EmailLink>
      </div>
    )
  }
  else {
    content = (
      <>
        <h2>Enquiry</h2>
        <Form className={formStyle.form}>
          <div className={cx(styles.stockItemWrap)}>
            <div className={cx(styles.stockItem)}>
              <div
                className={styles.img}
                style={{
                  backgroundImage: `url(${getThumbSrc({ id, ...images[0] })})`,
                }}
              >
              </div>
              <div className={styles.ref}>
                #
                {id}
              </div>
            </div>
          </div>
          <Field
            required
            name="email"
            validate="email"
            error="A valid email is required"
            placeholder="... your email"
          >
          </Field>
          {/* REF: #{id} */}
          <Textarea
            required
            name="enquiry"
            placeholder="... your enquiry"
            validate="{10,}"
            error="please enter your enquiry"
          >
          </Textarea>
          <Submit className={formStyle.submit}>Submit</Submit>
        </Form>
      </>
    )
  }
  return (
    <div className={formStyle.formWrap}>
      <CloseBtn />
      {content}
    </div>
  )
}

export default ContactForm
