import * as serverConfig from '@server/config'
const { url, company, foundingDate, logo, country, email, companyImage, streetAddress, town, postcode, tel, priceRange, openingHours } = serverConfig

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': url, // The @id keyword allows you to give a node a URI. This URI identifies the node.
  'name': company,
  'legalName': company, //    The official name of the organization, e.g. the registered company name
  'foundingDate': foundingDate,
  'telephone': tel, // the main number, Examples:"+1-800-555-1212", "+44-2078225951"
  'url': url,
  'logo': logo,
  'areaServed': {
    '@type': 'Country',
    'name': country,
  },
  'email': email,
  'image': [companyImage],
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': streetAddress,
    'addressLocality': town,
    'postalCode': postcode,
    'addressCountry': 'UK',
  },
  'contactPoint': [
    {
      '@type': 'ContactPoint',
      'telephone': tel,
      'contactType': 'sales',
    },
  ],
  'priceRange': priceRange,
  'currenciesAccepted': 'GBP',
  'paymentAccepted': 'Cash, Cheque, Credit Card',
  'openingHours': openingHours,
}
