let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const divContainer = document.querySelector("#toy-collection");
  const submit = document.querySelector('.submit')
  const toyForm = document.querySelector('form')

  
  toyForm.addEventListener('submit', handleSubmit)
  
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => newToy(json));
  
  function newToy(json){
    
    console.log(json)
    for (const toy of json) {
      let toyCard = document.createElement('div')
      let tP = document.createElement('p')
      let tButton = document.createElement('button')
      let tImg = document.createElement('img')
      let tName = document.createElement('h2')
      
      tName.innerText = toy.name
      tImg.src = toy.image
      tP.innerText = toy.likes + " Likes"
      toyCard.className = "card"
      toyCard.id = toy.id
      tImg.className = "toy-avatar"
      tButton.className = "like-btn"
      tButton.innerText = "Like <3"

      tButton.addEventListener('click',(e) => updateToy(toy) )
      
      toyCard.append(tName, tImg, tP, tButton)
      divContainer.appendChild(toyCard)
    }
  };
  function handleSubmit(e){
    e.preventDefault()
    let toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    postToys(toy)
  }
  // function handleEdit(toy){
  //   console.log(toy)
  // }

  function updateToy(toy){
    toy.likes ++
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: toy.likes})
    })
    .then(res => res.json())
    .then(toy => {
      let oldToy = document.getElementById(toy.id)
      let p = oldToy.querySelector('p')
      p.textContent = toy.likes + " Likes"
    })
  }
  
  
  function postToys(toy){
    fetch(`http://localhost:3000/toys`,{
      method:'POST',
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(toy => newToy(toy))
  }
  
  // let configObj = {
  //     method: "POST",
  //     headers: {
  //         "content-type": "application/json",
  //         "accept": "application/json"
  //       },
  //       body: JSON.stringify(toy) 
  //     }
      
      // function postToys(toy){
      //   fetch("http://localhost:3000/toys", configObj)
      //   .then(function(response){
      //     return response.json();
      //   })
      //   .then(function(object){
      //     console.log(object)
      //   })
      // }


      addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
          toyFormContainer.style.display = "block";
        } else {
          toyFormContainer.style.display = "none";
        }
      });
    });
    
    