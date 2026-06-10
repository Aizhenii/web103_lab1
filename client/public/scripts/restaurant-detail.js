const fieldLabels = {
  id: 'ID',
  name: 'Name',
  pricePoint: 'Price point',
  image: 'Image URL',
  description: 'Description'
}

const getRestaurantId = () => window.location.pathname.split('/').filter(Boolean).pop()

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

const renderRestaurant = async () => {
  const detailContent = document.getElementById('detail-content')
  const restaurantId = getRestaurantId()

  try {
    const response = await fetch(`/api/restaurants/${restaurantId}`)

    if (!response.ok) {
      window.location.replace('/not-found')
      return
    }

    const restaurant = await response.json()

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
    detailContent.replaceChildren(hero)
  } catch (error) {
    detailContent.innerHTML = '<p>Restaurant details could not be loaded right now.</p>'
  }
}

renderRestaurant()
