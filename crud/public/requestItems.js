document.addEventListener('DOMContentLoaded', () => {
  const itemList = document.getElementById('item-list')

  async function requestItems() {
    itemList.innerHTML = ''

    const response = await fetch('/items')
    const items = await response.json()

    items.forEach((item) => {
      const list = document.createElement('li')
      list.textContent = item.name
      itemList.appendChild(list)
    })
  }

  //PUT
  window.updateItem = async function () {
    const updateId = document.getElementById('id').value
    const updateName = document.getElementById('update-name').value
    const response = await fetch(`/items/${updateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updateName }),
    })

    if (response.ok) {
      requestItems()
    } else {
      alert('Error al actualizar')
    }
  }

  //DELETE
  window.deleteItem = async function () {
    const deleteId = document.getElementById('delete-id').value
    const response = await fetch(`/items/${deleteId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      requestItems()
    } else {
      alert('Error al eliminar el producto')
    }
  }
  requestItems()
  //UPDATE FORM
  window.updateItemFromIndex = async function () {
    const updateId = document.getElementById('update-form')
  }
})
