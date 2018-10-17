document.addEventListener('DOMContentLoaded', () => {
  getToys();
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const toyCollection = document.querySelector('#toy-collection');
  let addToy = false;

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    console.log("Hello")
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
      toyForm.addEventListener('submit', addNewToy)
    } else {
      toyForm.style.display = 'none'
    }
  })

  function getToys() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => json.forEach(displayToy))
  }

  function displayToy(obj){
    let toyDiv = document.createElement('div');
    toyDiv.className = 'card';
    toyDiv.innerHTML = `<h2>${obj.name}</h2>
    <img src=${obj.image} class='toy-avatar'>
    <p>${obj.likes}<p>
    <button class="like-btn" data-id=${obj.id}>Like <3</button>`
    toyCollection.append(toyDiv);
    let likeButton = document.querySelector(`[data-id='${obj.id}']`);
    likeButton.addEventListener('click', updateLikes)
  }

  function updateLikes(e) {
    //update likes on DOMContentLoaded
    let id = e.target.dataset.id;
    let toyDiv = e.target.parentNode.parentNode;
    let likes = toyDiv.querySelector('p');
    likes.innerText = parseInt(likes.innerText) + 1;
    //update likes in dataBase
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({likes: `${likes.innerText}`})
    })
  }

  function addNewToy(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let image = e.target.image.value;
    let newToy = {name: name, image: image, likes:0};
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(displayToy)
  }

})


// OR HERE!
