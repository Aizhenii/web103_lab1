const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const renderRestaurants = async () => {
  const mainContent = document.getElementById('main-content')

  try {
    const response = await fetch('/api/restaurants')
    const restaurants = await response.json()

    mainContent.replaceChildren()

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
