console.log('client side javascript message printed!');
const city = 'Oslo';

fetch(`http://localhost:3000/weather?address=Oslo`).then((response) => {
    return response.json();
}).then(({weather, location, address}) => {
    console.log(weather);
    console.log(location);
    console.log(address);
}).catch((err) => {
    console.log(`Error has occured: ${err}`);
})