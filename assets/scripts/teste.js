 

const fetchApi = (option,search, ) =>{
   const result = fetch(`${option}${search}`)
   .then((res)=>res.json())
   .then((data)=>{
      console.log(data)
      return data
   })
   return result
}

const button = document.getElementById('btn').addEventListener('click', async (event)=>{
   event.preventDefault()
   const $select = document.querySelector('#filter')
   const $search = document.querySelector('#search-bar')
   const result = await fetchApi(definirPesquisa($select.value), $search.value)
   const $section = document.getElementById('card-area')
   $section.innerHTML =''

   for await (const results of result.results) {

      CreateCard(results.name, results.image, results.status, results.species, results.gender, results.origin.name)

   }
})

const definirPesquisa = (option)=>{
   if(option == 'character'){return 'https://rickandmortyapi.com/api/character/?name='}
   if(option == 'location'){return 'https://rickandmortyapi.com/api/location/?name='}
   if(option == 'ep'){return 'https://rickandmortyapi.com/api/episode/?name='}
}

const closeCard = document.querySelector('#card-area').onclick = function (event){
   if(event.target.classList.contains('close')){
      event.target.parentElement.remove()
   }
}

function CreateCard(name, img, status, specie, gender,ep){
   const $section = document.getElementById('card-area')
   const $Card = document.createElement('div')
   const $img = document.createElement('img')
   const $content = document.createElement('div')
   const $name = document.createElement('h3')
   const $state = document.createElement('span')
   const $lastLocate = document.createElement('p')
   const $locate = document.createElement('span')
   const $epPreFix = document.createElement('p')
   const $firstEp = document.createElement('span')
   const $closeButton = document.createElement('button')

   $closeButton.setAttribute('class', 'close')
   $firstEp.setAttribute('class', 'first-ep')
   $locate.setAttribute('class', 'locate')
   $state.setAttribute('class', 'state')
   $Card.setAttribute('class', 'character')
   $content.setAttribute('class', 'content')
   $img.setAttribute('src', img)

   $closeButton.innerHTML = 'x'
   $name.innerHTML = name
   $state.innerHTML = `${status} - ${specie}`
   $lastLocate.innerHTML = `gender`
   $locate.innerHTML = gender
   $epPreFix.innerHTML = 'origin'
   $firstEp.innerHTML = ep

   $Card.appendChild($img)
   $Card.appendChild($content)
   $Card.appendChild($closeButton)
   $content.appendChild($name)
   $content.appendChild($state)
   $content.appendChild($lastLocate)
   $content.appendChild($locate)
   $content.appendChild($epPreFix)
   $content.appendChild($firstEp)
   $section.appendChild($Card)
   
}