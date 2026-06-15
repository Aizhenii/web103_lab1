const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const fieldLabels = {
  id: 'ID',
  name: 'Name',
  pricePoint: 'Price point',
  image: 'Image URL',
  description: 'Description'
}

const getRestaurantId = () => window.location.pathname.split('/').filter(Boolean).pop()

const isDetailRoute = () => window.location.pathname.startsWith('/restaurants/')

const renderField = ([key, value]) => {
  const row = document.createElement('div')
  row.className = 'field-row'

  const label = document.createElement('dt')
  label.textContent = fieldLabels[key] || key

  const detail = document.createElement('dd')

  if (key === 'image') {
    const link = document.createElement('a')
    link.href = value
    link.textContent = value
    link.target = '_blank'
    link.rel = 'noreferrer'
    detail.appendChild(link)
  } else {
    detail.textContent = value
  }

  row.append(label, detail)
  return row
}

const renderRestaurantDetail = (restaurant, mainContent) => {
  document.title = `${restaurant.name} | Best Restaurants`

  const hero = document.createElement('section')
  hero.className = 'detail-layout'

  const image = document.createElement('img')
  image.className = 'detail-image'
  image.src = `${restaurant.image}?auto=format&fit=crop&w=1200&q=85`
  image.alt = restaurant.name

  const summary = document.createElement('article')
  summary.className = 'detail-summary'

  const eyebrow = document.createElement('p')
  eyebrow.className = 'eyebrow'
  eyebrow.textContent = restaurant.pricePoint

  const name = document.createElement('h2')
  name.textContent = restaurant.name

  const description = document.createElement('p')
  description.textContent = restaurant.description

  const fields = document.createElement('dl')
  fields.className = 'field-list'
  Object.entries(restaurant).forEach((entry) => fields.appendChild(renderField(entry)))

  summary.append(eyebrow, name, description, fields)
  hero.append(image, summary)
  mainContent.replaceChildren(hero)
}

const renderRestaurants = async () => {
  const mainContent = document.getElementById('main-content')

  try {
    const response = await fetch('/api/restaurants')
    const restaurants = await response.json()

    mainContent.replaceChildren()

    if (isDetailRoute()) {
      const restaurantId = getRestaurantId()
      const restaurant = restaurants.find(
        (item) => String(item.id) === restaurantId || slugify(item.name) === restaurantId
      )

      if (!restaurant) {
        window.location.replace('/not-found')
        return
      }

      renderRestaurantDetail(restaurant, mainContent)
      return
    }

    if (!restaurants.length) {
      const noRestaurants = document.createElement('p')
      noRestaurants.textContent = 'No restaurants available.'
      mainContent.appendChild(noRestaurants)
      return
    }

    restaurants.forEach((restaurant) => {
      const card = document.createElement('article')
      card.className = 'restaurant-card'

      const image = document.createElement('img')
      image.src = `${restaurant.image}?auto=format&fit=crop&w=900&q=80`
      image.alt = restaurant.name
      image.loading = 'lazy'

      const content = document.createElement('div')
      content.className = 'restaurant-card-content'

      const name = document.createElement('h3')
      name.textContent = restaurant.name

      const description = document.createElement('p')
      description.textContent = restaurant.description

      const meta = document.createElement('p')
      meta.className = 'restaurant-meta'
      meta.textContent = `Price point: ${restaurant.pricePoint}`

      const details = document.createElement('a')
      details.href = `/restaurants/${slugify(restaurant.name)}`
      details.textContent = 'View details'
      details.setAttribute('role', 'button')

      content.append(name, description, meta, details)
      card.append(image, content)
      mainContent.appendChild(card)
    })
  } catch (error) {
    const errorMessage = document.createElement('p')
    errorMessage.textContent = 'Restaurants could not be loaded right now.'
    mainContent.replaceChildren(errorMessage)
  }
}

renderRestaurants()
