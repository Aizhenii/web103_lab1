const renderGifts = async () => {
    const response = await fetch('/gifts')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')
    if (data) {
        data.map(restaurant => {
            const card = document.createElement('div')
            card.classList.add('card')
        })
    }
    else {
        const noRestaurant = document.createElement('h2')
        noRestaurant.textContent = 'No Restaurants Available'
        mainContent.appendChild(noRestaurant)
    }

}