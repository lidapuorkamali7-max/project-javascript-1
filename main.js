
let products =

  [{ id: 1, name: "Laptop", category: "Electronics", price: 800, stock: 10, image: 'images/laptop.jpg' },
  { id: 2, name: "Keyboard", category: "Electronics", price: 50, stock: 25, image: 'images/keyboard.jpg' },
  { id: 3, name: "Mouse", category: "Electronics", price: 25, stock: 4, image: 'images/mouse.jpg' },
  { id: 4, name: "Headphones", category: "Electronics", price: 100, stock: 0, image: 'images/headphones.webp' },
  { id: 5, name: "Monitor", category: "Electronics", price: 300, stock: 7, image: 'images/monitor.webp' },
  { id: 6, name: "T-Shirt", category: "Clothing", price: 30, stock: 20, image: 'images/tshirt.png' },
  { id: 7, name: "Jeans", category: "Clothing", price: 60, stock: 8, image: 'images/jeans.jpg' },
  { id: 8, name: "Jacket", category: "Clothing", price: 90, stock: 3, image: 'images/jacket.jpg' },
  { id: 9, name: "Sneakers", category: "Clothing", price: 120, stock: 0, image: 'images/sneakers.jpg' },
  { id: 10, name: "T-Shirt", category: "Clothing", price: 35, stock: 12, image: 'images/womantshirt.jpg' },
  { id: 11, name: "Novel", category: "Books", price: 20, stock: 30, image: 'images/novel.jpg' },
  { id: 12, name: "Dictionary", category: "Books", price: 25, stock: 5, image: 'images/dictionary.jpg' },
  { id: 13, name: "JavaScript Book", category: "Books", price: 45, stock: 2, image: 'images/javascript.png' },
  { id: 14, name: "History Book", category: "Books", price: 30, stock: 0, image: 'images/historybook.jpg' },
  { id: 15, name: "CSS Book", category: "Books", price: 40, stock: 15, image: 'images/css.jpg' }];


const saveddata = localStorage.getItem('products')
if (saveddata) {
  products = JSON.parse(saveddata)
}

const displayproducts = document.getElementById('displayproducts')
const imageinput = document.getElementById('imageinput')

let editingid = null
function displayproductsfunc(list) {
  displayproducts.innerHTML = ''
  list.forEach((product) => {
    displayproducts.innerHTML += `
      <div class='product'>
     <img class='image' src='${product.image}' loading='lazy' decoding='async'><br><br>
      <strong>name</strong>: ${product.name}<br>
      <strong>category</strong>: ${product.category}<br>
      <strong>price</strong>: $${product.price}<br>
      <span>${product.stock === 0 ? '<strong>out of stock</strong>' : '<strong>stock:</strong>' + product.stock} 
       ${product.stock < 5 && product.stock > 0 ? 'low stock' : ''}</span><br><br>
      <button class='editbtn' data-id='${product.id}'>edit</button>
      <button class='deletebtn' data-id='${product.id}'>delete</button> </div>
     
   `
  })
  const editbtns = document.querySelectorAll('.editbtn')

  editbtns.forEach((button) => {
    button.addEventListener('click', function () {
      const id = Number(button.dataset.id)
      editingid = id
      const editproduct = products.find((product) => {
        return product.id === id
      })
      nameinput.value = editproduct.name
      categoryinput.value = editproduct.category
      priceinput.value = editproduct.price
      stockinput.value = editproduct.stock
      nameinput.focus()
      



    })
  })
  const deletebtns = document.querySelectorAll('.deletebtn')
  deletebtns.forEach((button) => {
    button.addEventListener('click', function () {
      const id = Number(button.dataset.id)
      const answer = confirm('are you sure you want to delete the product?')
      if (answer) {
        products = products.filter((product) => {
          return product.id !== id
        })

      }
      else { return; }
      localStorage.setItem('products', JSON.stringify(products))
      displayproductsfunc(products)
      calculatetotal()
    })
  })

}
const nameinput = document.getElementById('nameinput')
const categoryinput = document.getElementById('categoryinput')
const priceinput = document.getElementById('priceinput')
const stockinput = document.getElementById('stockinput')
const addbtn = document.getElementById('addbtn')
const message = document.getElementById('message')
addbtn.addEventListener('click', function (event) {
  event.preventDefault()
  if (nameinput.value.trim() === '' || categoryinput.value.trim() === '' || priceinput.value.trim() === '' || stockinput.value.trim() === '') {
    message.innerHTML = 'please fill all the fields'
    return;
  }
  const imagefile = imageinput.files[0]

  if (editingid === null) {
    if (!imagefile) {
      message.innerHTML = 'please choose an image'
      return;
    }
    const reader = new FileReader()
    reader.onload = function () {
      let newproduct = {
        id: Date.now(),
        name: nameinput.value,
        category: categoryinput.value,
        price: Number(priceinput.value),
        stock: Number(stockinput.value),
        image: reader.result,
      }
      products.push(newproduct)
      localStorage.setItem('products', JSON.stringify(products))
      displayproductsfunc(products)
      calculatetotal()
      nameinput.value = ''
      categoryinput.value = ''
      priceinput.value = ''
      stockinput.value = ''
      message.innerHTML = 'product added successfully'
    }
    reader.readAsDataURL(imagefile)


  } else {
    const editingitem = products.find((product) => {
      return product.id === editingid
    })
    editingitem.name = nameinput.value
    editingitem.category = categoryinput.value
    editingitem.price = Number(priceinput.value)
    editingitem.stock = Number(stockinput.value)
   

    if (imagefile) {
      const reader = new FileReader()
      reader.onload = function () {
        editingitem.image = reader.result
        localStorage.setItem('products', JSON.stringify(products))
        displayproductsfunc(products)
        calculatetotal()
        editingid = null
        nameinput.value = ''
        categoryinput.value = ''
        priceinput.value = ''
        stockinput.value = ''
        imageinput.value = ''

        message.innerHTML = 'product updated successfully'
      }
      reader.readAsDataURL(imagefile)
    }
    else {
      localStorage.setItem(
        'products',
        JSON.stringify(products)
      )

      displayproductsfunc(products)
      calculatetotal()

      editingid = null

      nameinput.value = ''
      categoryinput.value = ''
      priceinput.value = ''
      stockinput.value = ''

      message.innerHTML = 'product updated successfully'
    }
  }

})
displayproductsfunc(products)
let searchinput = document.getElementById('searchinput')
let result = document.getElementById('result')

searchinput.addEventListener('input', function () {
  const searchproducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchinput.value.toLowerCase())
  })
  if (searchproducts.length > 0) {
    displayproductsfunc(searchproducts)
  }
  else { displayproducts.innerHTML = 'no product found' }

})
const totalamount = document.getElementById('totalamount')
function calculatetotal() {
  let stocks = 0;
  let lowstock = 0;
  let outofstock = 0
  let total = products.length
  products.forEach((product) => {
    stocks += Number(product.stock)
    if (product.stock > 0 && product.stock < 5) {
      lowstock++
    }
    if (product.stock === 0) {
      outofstock++
    }
  })
  totalamount.innerHTML = `
    <strong>total products</strong>:  ${total}<br>
    <strong>low stocks</strong>:  ${lowstock}<br>
    <strong>out of stock</strong>:  ${outofstock}<br>
    `

}
calculatetotal()