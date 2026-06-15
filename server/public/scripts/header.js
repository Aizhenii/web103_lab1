const header = document.querySelector('header')
const headerContainer = document.createElement('div')
headerContainer.className = 'header-container container'

const headerLeft = document.createElement('a')
headerLeft.className = 'header-left'
headerLeft.href = '/'
headerLeft.setAttribute('aria-label', 'Best Restaurants home')

const headerLogo = document.createElement('img')
headerLogo.src = '/logo.png'
headerLogo.alt = 'Best Restaurants logo'

const headerTitle = document.createElement('h1')
headerTitle.textContent = 'Best Restaurants'

headerLeft.appendChild(headerLogo)
headerLeft.appendChild(headerTitle)

const headerRight = document.createElement('nav')
headerRight.className = 'header-right'
headerRight.setAttribute('aria-label', 'Primary navigation')

const headerLink = document.createElement('a')
headerLink.textContent = 'Home'
headerLink.href = '/'
headerLink.setAttribute('role', 'button')
headerLink.className = 'secondary'

headerRight.appendChild(headerLink)
headerContainer.appendChild(headerLeft)
headerContainer.appendChild(headerRight)
header.appendChild(headerContainer)
