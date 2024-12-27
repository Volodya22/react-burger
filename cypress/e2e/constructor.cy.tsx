const BUN = `[data-cy='643d69a5c3f7b9001cfa093d']`
const INGREDIENT = `[data-cy='643d69a5c3f7b9001cfa093e']`

describe('Тест работы конструктора', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' })
  })

  it('Тест добавления булки и начинки', () => {
    cy.get(BUN).trigger('dragstart')
    cy.get('[data-cy="bun-top"]')
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })
      .wait(50)
    cy.get('[data-cy="bun-top-selected"]').should('contain.text', 'Флюоресцентная булка R2-D3')
    cy.get('[data-cy="bun-bottom-selected"]').should('contain.text', 'Флюоресцентная булка R2-D3')

    cy.get(INGREDIENT).trigger('dragstart')
    cy.get('[data-cy="ingredient"]')
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })
      .wait(50)
    cy.get('[data-cy="ingredient-selected"]').should('contain.text', 'Филе Люминесцентного тетраодонтимформа')
  })
})

describe('Тест работы модального окна с детальной информацией по ингредиенту', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' })
  })

  it('Тест открытия модального окна', () => {
    cy.get(BUN).click()
  })

  it('Тест данных внутри модального окна', () => {
    cy.get(BUN).click()
    cy.get('[data-cy="ingredient-name"]').should('contain.text', 'Флюоресцентная булка R2-D3')
    cy.get('[data-cy="ingredient-data"]').should('contain.text', '643')
    cy.get('[data-cy="ingredient-data"]').should('contain.text', '44')
    cy.get('[data-cy="ingredient-data"]').should('contain.text', '26')
    cy.get('[data-cy="ingredient-data"]').should('contain.text', '85')
  })

  it('Тест закрытия модального окна (кнопка)', () => {
    cy.get(BUN).click()
    cy.get('[data-cy="modal-close"]').click()
  })

  it('Тест закрытия модального окна (оверлей)', () => {
    cy.get(BUN).click()
    cy.get('[data-cy="overlay"]').click({ force: true })
  })
})

describe('Тест оформления заказа', () => {
  beforeEach(() => {
    localStorage.setItem('accessToken', 'test-accessToken')
    localStorage.setItem('refreshToken', 'test-refreshToken')

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' })
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' })
    cy.visit('/')
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('Тест оформления заказа и закрытие по кнопке', () => {
    cy.get(BUN).trigger('dragstart')
    cy.get('[data-cy="bun-top"]')
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })

    cy.get(INGREDIENT).trigger('dragstart')
    cy.get('[data-cy="ingredient"]')
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })
      .wait(50)

    cy.get('button').contains('Оформить заказ').click()
    cy.get('[data-cy="orderNumber"]').should('contain.text', '52525')
    cy.get('[data-cy="modal-close"]').click()
    cy.get('[data-cy="bun-top"]').contains('Добавьте булочку')
    cy.get('[data-cy="ingredient"]').contains('Добавьте ингредиент')
    cy.get('[data-cy="bun-bottom"]').contains('Добавьте булочку')
  })
})
