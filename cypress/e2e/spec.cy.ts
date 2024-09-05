describe('Flow Tests', () => {
  const incomeName = "Suzy"
  const incomeDescription = "Yardwork"
  const incomeAmount = '55'
  const expenseName = 'Gas'
  const expenseDate = '09/04/2024'
  const expenseAmount = '33'
  const username = 'Jane Doe'

  it('Shows the landing page', () => {
    cy.visit('/')
    cy.get('[data-testid=get_started_button]').click()
  })

  it('Navigates through the Medicaid only flow', () => {
    cy.visit('/')

    landingPage()
    howThisWorksPage()
    benefitsPage({medicaid: true, snap: false})
    ledgerLandingPage()
    ledgerAddIncomePage()
    ledgerIncomeListPage()
    ledgerExpenseLandingPage()
    ledgerExpenseAddPage()
    ledgerExpenseListPage()
    ledgerReviewPage()
    statementSignPage()
    statementConfirmationPage()
  })

  it('Navigates through the SNAP only flow (with standard deduction)', () => {
    cy.visit('/')

    landingPage()
    howThisWorksPage()
    benefitsPage({medicaid: false, snap: true})
    ledgerLandingPage()
    ledgerAddIncomePage()
    ledgerIncomeListPage()
    ledgerExpenseSnapPage({itemize: false})
    ledgerReviewPage()
    statementSignPage()
    statementConfirmationPage()
  })

  it('Navigates through the SNAP only flow (without standard deduction', () => {
    cy.visit('/')

    landingPage()
    howThisWorksPage()
    benefitsPage({medicaid: false, snap: true})
    ledgerLandingPage()
    ledgerAddIncomePage()
    ledgerIncomeListPage()
    ledgerExpenseSnapPage({itemize: true})
    ledgerExpenseLandingPage()
    ledgerExpenseAddPage()
    ledgerExpenseListPage()
    ledgerReviewPage()
    statementSignPage()
    statementConfirmationPage()
  })

  function landingPage() {
    cy.get('button').contains('Get Started').should('exist')
    cy.get('[data-testid=get_started_button]').should('exist')
    cy.get('[data-testid=get_started_button]').click()
  }

  function howThisWorksPage() {
    cy.url().should('include', '/introduction/how-this-works')
    cy.contains("Lorem ipsum").not('be.visible')
    cy.get('[data-testid=accordionButton_what_is_self_employment]').trigger("click")
    cy.contains("Lorem ipsum").should('be.visible')
    cy.get('[data-testid=get_started_button]').trigger("click")
  }

  function benefitsPage({medicaid, snap}: {medicaid:boolean, snap: boolean}) {
    cy.url().should('include', '/introduction/benefits')
    if (medicaid) {
      cy.get('label[for=medicaid]').click()
    }

    if (snap) {
      cy.get('label[for=snap]').click()
    }

    cy.get('[data-testid=continue_button]').click()
  }

  function ledgerLandingPage() {
    cy.url().should('include', '/ledger/income')
    cy.get('[data-testid=accordionItem_income_landing_what_counts]').not('be.visible')
    cy.get('[data-testid=accordionButton_income_landing_what_counts').trigger("click")
    cy.get('[data-testid=accordionItem_income_landing_what_counts]').should('be.visible')
    cy.get('[data-testid=add_income_button').trigger("click")
  }

  function ledgerAddIncomePage() {
    cy.url().should('include', '/ledger/income/add')
    cy.get('[data-testid=name]').type(incomeName)
    cy.get('[data-testid=description]').type(incomeDescription)
    cy.get('[data-testid=amount]').type(incomeAmount)
    cy.get('[data-testid=continue_button]').click()
  }

  function ledgerIncomeListPage() {
    cy.url().should('include', '/ledger/income/list')
    cy.contains(incomeName)
    cy.contains(incomeDescription)
    cy.contains(incomeAmount)
    cy.get('[data-testid=done_button]').click()
  }

  function ledgerExpenseLandingPage() {
    cy.url().should('include', '/ledger/expense')
    cy.get('[data-testid=accordionItem_expenses_landing_what_counts]').not('be.visible')
    cy.get('[data-testid=accordionButton_expenses_landing_what_counts]').click()
    cy.get('[data-testid=accordionItem_expenses_landing_what_counts]').should('be.visible')
    cy.get('[data-testid=add_expenses_button').click()
  }

  function ledgerExpenseAddPage() {
    cy.url().should('include', '/ledger/expense/add')
    cy.get('[data-testid=name]').type(expenseName)
    cy.get('#date').type(expenseDate)
    cy.get('[data-testid=amount]').type(expenseAmount)
    cy.get('[data-testid=continue_button]').click()
  }

  function ledgerExpenseListPage() {
    cy.url().should('include', '/ledger/expense/list')
    cy.contains(expenseName)
    cy.contains(expenseDate)
    cy.contains(expenseAmount)
    cy.get('[data-testid=continue_button]').click()
  }

  function ledgerReviewPage() {
    cy.url().should('include', '/ledger/review')
    cy.contains(incomeName)
    cy.contains(incomeDescription)
    cy.contains(incomeAmount)
    cy.contains(incomeName)
    cy.contains(incomeDescription)
    cy.contains(incomeAmount)
    cy.get('[data-testid=continue-button]').click()
  }

  function statementSignPage() {
    cy.url().should('include', '/statement/sign')
    cy.get('label[for=understood]').click()
    cy.get('[data-testid=signedName]').type(username)
    cy.get('[data-testid=continue_button]').click()
  }

  function statementConfirmationPage() {
    cy.url().should('include', '/statement/confirmation')
    cy.contains("Your confirmation number is:")
    cy.contains('Download proof')
  }

  function ledgerExpenseSnapPage({itemize}: {itemize: boolean}) {
    cy.url().should('include', '/ledger/expense/snap')
    if (itemize) {
      cy.get('label[for=yes_radio]').click()
    } else {
      cy.get('label[for=no_radio]').click()
    }
    cy.get('button[data-testid=continue-button]').click()
  }
})