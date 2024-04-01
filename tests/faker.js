const { fakerPT_BR } = require('@faker-js/faker')

const name = fakerPT_BR.helpers.fake('{{person.firstName}}')
const lastname = fakerPT_BR.helpers.fake('{{person.lastName}}')
const companyName = fakerPT_BR.company.name()
const email = fakerPT_BR.helpers.fake(`${name}${lastname}@test.com`).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').toLowerCase()

const register = {
  name: name,
  lastname: lastname,
  email: email,
  company: companyName,
  pass: fakerPT_BR.internet.password({ length: 8 }),
  errorpass: fakerPT_BR.internet.password({ length: 4 })
}

module.exports = { register }