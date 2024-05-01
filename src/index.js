// function to get film data for one film
const getfilmData = async(id) => {
    const res = await fetch(`http://localhost:3000/films/${id}`)
    const film = await res.json()
    return film;
}
//function to get all movies    
const getAllMovieData = async() => {
    const res = await fetch('http://localhost:3000/films')
    const films = await res.json();
    return films
}
//function render film details to the DOM.
const filmDetails = (film) => {
    const posters = document.getElementById('poster')
    posters.src= film.poster;
    posters.alt= film.title;
    const title = document.getElementById('title')
    title.textContent = film.title
    const runtime = document.getElementById('runtime')
    runtime.textContent = `${film.runtime} minutes`
    const description = document.getElementById('film-info')
    description.textContent = film.description
    let showTime = document.getElementById('showtime')
    showTime.textContent =  film.showtime
    let remainingTicket = document.querySelector('#ticket-num')
        let tickets = `${film.capacity}` - `${film.tickets_sold}`
        remainingTicket.textContent = tickets
// Adding an event listener to the buy ticket.
        const buyButton = document.querySelector('#buy-ticket')
        buyButton.addEventListener('click', () => {
// condition to return the remaining number of tickets after purchase.
            if (tickets > 0) {
                remainingTicket.textContent = tickets - 1;
                tickets --;
                if(tickets === 0){
                    buyButton.textContent = 'Sold Out!'
                }
            }           
        });     
}
//function to display first film
function getFirstFilm () {
    fetch("http://localhost:3000/films/1")
        .then(res => res.json())
        .then(film => filmDetails(film))
}
getFirstFilm()
//function to generate list
const filmList = async () => {
    const films = await getAllMovieData()
    films.forEach((film) => {
        const titles = document.getElementById('films')
        const li = document.createElement('li')
        li.textContent = film.title.toUpperCase()
        li.className = 'film item'
        li.addEventListener('click', async () => {
            const displayFilm =await getfilmData(film.id);
            filmDetails(displayFilm);
        });
        titles.appendChild(li)
    });
}
filmList()

