const poke_container = document.getElementById('poke-container')
const modal = document.getElementById("myModal")
const pokemon_number = 300

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_number; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `http://localhost:8080/id/${id}`
    const res = await fetch(url)
    const pokemon = await res.json()
    createPokemonCard(pokemon)
}

const createPokemonCard = (pokemon) => {

    const imagen = pokemon.sprites.front_default;
    const id = pokemon.id.toString()
    const name = pokemon.name
    const types = pokemon.types
    const peso = pokemon.weight/10
    const abilities = pokemon.abilities
    let tipos = ``
    let habilidades = ``

    //iterating array types
    for (let i = 0; i < types.length; i++) {
        if (types.length == 1) {
            tipos = `<span>` + types[i].type.name + `</span>`
        } else if (i === types.length - 1) {
            tipos += `<span>` + types[i].type.name + `</span>`
        } else {
            tipos += `<span>` + types[i].type.name + `, </span>`
        }
    }

    //iterating array abilities
    for (let i = 0; i < abilities.length; i++) {
        if (abilities.length == 1) {
            habilidades = `<span>` + abilities[i].ability.name + `</span><br>`
        } else if (i === abilities.length - 1) {
            habilidades += `<span>` + abilities[i].ability.name + `</span><br>`
        } else {
            habilidades += `<span>` + abilities[i].ability.name + `, </span><br>`
        }
    }


    const pokemonElement = document.createElement('div')
    pokemonElement.classList.add('pokemon')
    pokemonElement.classList.add('grow')
    pokemonElement.addEventListener("click", function () {
        createModal(pokemon, imagen, id, name, tipos, peso, habilidades);
        modal.style.display = "block";
    })
    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="${imagen}" alt="">
    </div>
    <div class="info">
        <span class="number">N° ${id}</span>
        <h3 class="name">${name}</h3>
        <label class="bold">Type:  </label><span>${tipos}</span><br>
        <label class="bold">Weight:  </label><span>${peso} kg</span><br>  
        <label class="bold">Abilities:  </label><br><span>${habilidades}</span><br>
    </div>
    `

    pokemonElement.innerHTML = pokemonInnerHTML
    poke_container.appendChild(pokemonElement)
}

fetchPokemons()


function createModal(pokemon, imagen, id, name, tipos, peso, habilidades) {
    const height = pokemon.height/10
    const speed = pokemon.stats[5].base_stat
    const attack = pokemon.stats[1].base_stat
    const defense = pokemon.stats[2].base_stat
    const hp = pokemon.stats[0].base_stat
    const specialAttack = pokemon.stats[3].base_stat
    const specialDefense = pokemon.stats[4].base_stat

    const modalWindowElement = document.createElement('div')
    modalWindowElement.setAttribute('id','modal-content');
    modalWindowElement.classList.add('modal-content')
    const modalWindowInnerHTML = `
            <div class="modal-header">
                <span class="close" id="closeModal">&times;</span>
                <h2>Pokedex</h2>
            </div>
            <div class="modal-body">
                <div class="img-container">
                <img src="${imagen}" alt="">
                <img src="${pokemon.sprites.back_default}" alt="">
            </div>
            <div class="info">
                <span class="number">N° ${id}</span>
                <h3 class="name">${name}</h3>
                <label class="bold">Type:  </label><span>${tipos}</span><br>
                <label class="bold">Weight:  </label><span>${peso} kg</span><br>  
                <label class="bold">Abilities:  </label><br><span>${habilidades}</span><br>
                <label class="bold">Height:  </label><span>${height} mt</span><br> 
                <label class="bold">Speed:  </label><span>${speed}</span><br>
                <label class="bold">Attack:  </label><span>${attack}</span><br>
                <label class="bold">Defense:  </label><span>${defense}</span><br>
                <label class="bold">HP:  </label><span>${hp}</span><br>
                <label class="bold">Special Attack:  </label><span>${specialAttack}</span><br>
                <label class="bold">Special Defense:  </label><span>${specialDefense}</span><br>
                <br>
            </div>
            </div>`


    modalWindowElement.innerHTML = modalWindowInnerHTML
    modal.replaceChildren(modalWindowElement)


    // Get the <span> element that closes the modal
    var span = document.getElementById("closeModal")

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}




