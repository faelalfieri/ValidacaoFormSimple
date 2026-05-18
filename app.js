const form = document.querySelector('form')
const submitButton = document.querySelector('button')

const usernameFeedbackElement = document.createElement('p')
const submitFeedbackElement = document.createElement('p')

submitFeedbackElement.setAttribute('data-feedback', 'submit-feedback')

const invalidSubmitFeedback = {
  element: submitFeedbackElement,
  text: 'Por favor, insira um username válido',
  className: 'submit-help-feedback',
  referenceElement: submitButton
}

const validSubmitFeedback = {
  element: submitFeedbackElement,
  text: 'Dados enviados =)',
  className: 'submit-success-feedback',
  referenceElement: submitButton
}

const invalidUsernameFeedback = {
  element: usernameFeedbackElement,
  text: 'O valor deve conter no mínimo 6 caracteres, com apenas letras maiúsculas e/ou minúsculas',
  className: 'username-help-feedback',
  referenceElement: form.username,
}

const validUsernameFeedback = {
  element: usernameFeedbackElement,
  text: 'Username válido =)',
  className: 'username-success-feedback',
  referenceElement: form.username,
}

const insertFeedbackIntoDOM = feedbackInfo => {
  const { element, text, className, referenceElement } = feedbackInfo
  element.textContent = text
  element.className = className
  referenceElement.insertAdjacentElement('afterend', element)
}

const removeSubmitFeedback = () => {
  const existingSubmitFeedback = document.querySelector('[data-feedback="submit-feedback"]')

  if (existingSubmitFeedback) {
    submitFeedbackElement.remove()
  }
}

const isUsernameValid = username =>
  /^[a-zA-Z]{6,}$/.test(username)

const handleUsernameInput = event => {
  const username = event.target.value
  const usernameIsValid = isUsernameValid(username)

  removeSubmitFeedback()

  if (!usernameIsValid) {
    insertFeedbackIntoDOM(invalidUsernameFeedback)
    return
  }
  insertFeedbackIntoDOM(validUsernameFeedback)
}

const handleFormSubmit = event => {
  event.preventDefault()

  const username = form.username.value
  const usernameIsValid = isUsernameValid(username)

  if (!usernameIsValid) {
    insertFeedbackIntoDOM(invalidSubmitFeedback)
    return
  }
  insertFeedbackIntoDOM(validSubmitFeedback)
}

form.username.addEventListener('input', handleUsernameInput)
form.addEventListener('submit', handleFormSubmit)
