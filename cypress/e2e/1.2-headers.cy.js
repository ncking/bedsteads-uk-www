import { createHeaders } from '@raiz/cypress'


Cypress.on('uncaught:exception', (err, runnable, promise) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log('Cypress detected uncaught exception: ', err, runnable, promise);
  return false;
});



context('Cache-control checks', () => {

  it(`checking HEADERS: `, () => {
    const urls = [
      '/favicon/icon.svg',
      '/image/stock/22/2213/1709291108776,t_main,s_0.jpg'
    ]
    urls.map(url => {
      cy.request('GET', url).then((response) => {
        const ext = url.split('.').pop()
        const headers = createHeaders(response)
        expect(headers.maxAgeGreaterThan(999)).to.be.true
        expect(headers.isType(ext))
      })
    })
  })
})