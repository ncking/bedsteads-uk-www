import { Link } from '@raiz/nuggins'
import { EmailLink, TelLink, MainBlock } from '@components'
import config from '@config'
import * as styles from './style.scss'

export default () => {
  const { streetAddress, postcode } = config()

  return (
    <>
      {/* <BedsteadsImage
        alt="Reflection of Bedsteads delivery van, in bed knob"
        lazy="false"
        tag="div"
        className="viewport"
        responsive="1"
        src="/image/page/shavings,t_viewport.jpg"
      >
        <Intro>
        Bedsteads Privacy Policy
        </Intro>
      </BedsteadsImage> */}

      <MainBlock title="Bedsteads Privacy Policy">
        <>
          <h2>Our contact details</h2>
          <ul>
            <li>
              <span>Name: </span>
              Bedsteads
            </li>
            <li>
              <span>Address:</span>
              {streetAddress}
              ,
              {postcode}
            </li>
            <li>
              <span>Phone Number:</span>
              <TelLink />
            </li>
            <li>
              <span>E-mail:</span>
              <EmailLink />
            </li>
            <li>
              <span>Date completed:</span>
              15/02/2024
            </li>
          </ul>

          <h2>The type of personal information we collect</h2>
          <p>
            We currently collect and process the following
            information:
          </p>
          <h4>Personal identifiers:</h4>
          <ul className="list-disc">
            <li>Email Address</li>
            <li>
              Name and contact details (If the user has entered
              this into the enquiry form)
            </li>
            <li>
              Address (Disclosed to us by user/customer so we can
              arrange delivery)
            </li>
            <li>
              We do not keep or store any customer payment
              information such as card details for any amount of
              time or in any form.
            </li>
            <li>Record items purchased.</li>
          </ul>

          <h4>Online Identifiers:</h4>
          <ul className="list-disc">
            <li>IP address</li>
            <li>Cookies</li>
          </ul>

          <h2>
            How we get the personal information and why we have it
          </h2>

          <p>
            Most of the personal information we process is provided
            to us directly by you, the customer, for one of the
            following reasons:
          </p>

          <ul className="list-disc">
            <li>Enquire about purchasing an item</li>
            <li>Request a delivery quote</li>
            <li>
              Asking a question about an item or for more
              information about our work and what we do
            </li>
            <li>Requesting a custom item to be made / adapted.</li>
            <li>
              To contact about a specific item or keep updated
              about specific future projects (This is requested
              directly by our users / customers and is done
              manually via email or phone contact by a member of
              the team).
            </li>
          </ul>

          <p>
            We also receive personal information indirectly, from
            the following sources in the following scenarios:
          </p>
          <ul className="list-disc">
            <li>
              Google Analytics - This site uses Google Analytics
              to capture visitor information. This information
              cannot identify any personal information about the
              visitor. By the very nature of using analytics
              software a cookie is stored on your computer which
              enables the tracking software to provide helpful
              stats for us to use - visitors can opt out of
              Google's use of cookies or device identifiers by
              visiting Google's
              {' '}
              <Link url="http://www.google.com/settings/ads">
                Ads Settings.
              </Link>
              Alternatively, you can point your visitors to opt
              out of a third-party vendor's use of cookies by
              visiting the
              {' '}
              <Link url="https://www.networkadvertising.org/managing/opt_out.asp">
                Network Advertising Initiative opt-out page
              </Link>
              {' '}
              or control the use of device identifiers by using
              their device's settings.
            </li>
          </ul>
          <p>
            We use the information that you have given us in order
            to:
          </p>
          <ul className="list-disc">
            <li>Answer enquiries</li>
            <li>Complete sales</li>
            <li>Arrange delivery and delivery quotes</li>
            <li>
              Let customers know if we get items in that they may
              be interested in - this is usually at customers
              request via email.
            </li>
          </ul>
          <p>
            We may share this information with partner
            courier/delivery/export companies to receive delivery
            quotes, and deliver your items. They will need to have
            your address, and best contact phone number so that they
            can complete the delivery.
          </p>
          <p>
            Under the UK General Data Protection Regulation (UK
            GDPR), the lawful bases we rely on for processing this
            information are: We have a contractual obligation as
            requested by the customer - We are required to obtain
            your personal information such as your name, contact
            number and delivery address to fulfil your purchase.
          </p>
          <p>
            We do not store any customer card or payment details -
            Payments can be made via bank transfer or over the phone
            - we do not record our calls and telephone payments are
            processed through A2B Trust Payments.
          </p>
        </>

        <>
          <h2>How we store your personal information</h2>
          <p>
            Your information is securely stored.
            <br />
            <br />
            We keep a merchant copy of your invoice for no longer
            than 7 years. We will then dispose your information by
            incineration. We keep this information for tax
            inspection purposes only. The Merchant copy of an
            invoice will only contain information on what the
            customer purchased, and their contact information such
            as name, address, contact number and email address.
          </p>
          <h2>Your data protection rights</h2>
          <p>Under data protection law, you have rights including:</p>
          <ul className={styles.rights}>
            <li>
              <span>Your right of access -</span>
              You have the right to ask us for copies of your
              personal information.
            </li>
            <li>
              <span>Your right to rectification - </span>
              You have the right to ask us to rectify personal
              information you think is inaccurate. You also have
              the right to ask us to complete information you
              think is incomplete.
            </li>
            <li>
              <span>Your right to erasure - </span>
              You have the right to ask us to erase your personal
              information in certain circumstances. Your right to
              restriction of processing - You have the right to
              ask us to restrict the processing of your personal
              information in certain circumstances.
            </li>
            <li>
              <span>Your right to object to processing -</span>
              You have the the right to object to the processing
              of your personal information in certain
              circumstances. You are not required to pay any
              charge for exercising your rights. If you make a
              request, we have one month to respond to you. Please
              contact us at&nbsp;
              <EmailLink />
                            &nbsp;if you wish to make a request.
            </li>
          </ul>
          <h2>How to complain</h2>
          <p>
            If you have any concerns about our use of your personal
            information, you can make a complaint to us at &nbsp;
            <EmailLink />
                        &nbsp;
            <br />
            <br />
            You can also complain to the ICO if you are unhappy with
            how we have used your data.
            <br />
            <br />
            The ICO's address:
          </p>
          <address>
            Information Commissioner's Office
            <br />
            Wycliffe House
            <br />
            Water Lane
            <br />
            Wilmslow
            <br />
            Cheshire
            <br />
            SK9 5AF
          </address>
          <br />
          Helpline number:
          {' '}
          <Link tel="0303-123-1113" />
          <br />
          ICO website:
          {' '}
          <Link url="https://www.ico.org.uk" />
        </>
      </MainBlock>
    </>
  )
}
