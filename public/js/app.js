console.log('*finger guns*');

const weatherForm = document.querySelector('form');
const loc = document.getElementById('loc');
const weather = document.getElementById('weather');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = document.querySelector('input').value;
    console.log(search);
    fetch('http://localhost:3000/weather?address=' + search).then( (response) => {
        response.json().then( (data) => {
            if (data.err) {
                loc.textContent = data.err;
                weather.textContent = "";
            } else {
                loc.textContent = data.location.place_name;
                console.log(data.location.place_name);
                weather.textContent = data.forecast;
                console.log(data.forecast);
            }   
        })
    })
})