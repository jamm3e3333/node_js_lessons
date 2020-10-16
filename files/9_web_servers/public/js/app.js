console.log('client side javascript message printed!');
const city = 'Oslo';
const search = document.querySelector('input[type="text"]');

const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', (e) => {
    const location = search.value;
    if(!location){
        console.log('Put some values!')
    }
    else if(data.err){
        console.log(data.err);
    }
    else{
        fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
            return response.json();
        }).then(({weather, location, address}) => {
            console.log(weather);
            console.log(location);
            console.log(address);
        }).catch((err) => {
            console.log(`Error has occured: ${err}`);
        });
    }

    e.preventDefault();    
    
});
