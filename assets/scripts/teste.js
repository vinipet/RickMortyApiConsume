 

const fetchApi = (option,search, ) =>{
   const result = fetch(`${option}${search}`,)
   .then((res)=>res.json())
   .then((data)=>{
      console.log(data)
      return data
   })
   .catch()
   return result
}

const button = document.getElementById('btn').addEventListener('click', async (event)=>{
   event.preventDefault()
   const $select = document.querySelector('#filter')
   const $search = document.querySelector('#search-bar')
   const result = await fetchApi(definirPesquisa($select.value), $search.value)
   const $section = document.getElementById('card-area')
   $section.innerHTML =''
   
   if($select.value == 'character'){
      for await (const results of result.results) {
            CreateCardPerson(results.name, results.image, results.status, results.species, results.gender, results.origin.name)
         }
   }
   else if($select.value == 'location'){
      for await (const results of result.results) {
         CreateCardLocation(results.name, results.dimension, results.residents[0], results.type)
      }
   }
   else {
      for await (const results of result.results) {
         CreateCardEp(results.name, results.air_date, results.episode)
      }
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

function CreateCardPerson(name, img, status, specie, gender,ep){
   let card = document.createElement('div') 
   card.innerHTML = (
         `<div class="character">
         <img src=${img}  alt="Img" />
         <div class="content">
            <h3>${name}</h3>
            <span class="state">${status} - ${specie}</span>
            <p>last know locate</p>
            <span class="locate">${gender}</span>
            <p>First ep</p>
            <span class="first-ep">${ep}</span>
         </div>
         <button class="close">x</button>
      </div>`
   )
   const $section = document.getElementById('card-area')
   $section.appendChild(card)  
}

function  CreateCardLocation (name, dimension, residents1, type){
    
    let card = document.createElement('div') 
     card.innerHTML  = (`
      <div class="character">
         <div class="content">
            <h3>${name}</h3>
            <p>Dimension</p>
            <span class="locate">${dimension}</span>
            <p>type</p>
            <span class="first-ep">${type}</span>
         </div>
         <button class="close">x</button> 
      </div>
      `)
   const $section = document.getElementById('card-area')
   $section.appendChild(card)
}

   function CreateCardEp (name, date, ep,  ){
      let card = document.createElement('div') 
      card.innerHTML  = (`
       <div class="character">
          <div class="content">
             <h3>${name}</h3>
             <p>Air Date</p>
             <span class="locate">${date}</span>
             <p>episode</p>
             <span class="first-ep">${ep}</span>
          </div>
          <button class="close">x</button> 
       </div>
       `)
    const $section = document.getElementById('card-area')
    $section.appendChild(card)
   }

