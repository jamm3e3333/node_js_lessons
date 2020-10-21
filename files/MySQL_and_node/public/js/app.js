const form = document.querySelector('form');

form.addEventListener('submit',(e) => {
    getData('localhost:3000/auth/register/')
    .then(({data}) => {
        console.log(data);
        console.log(e);
    })
    .catch((err) => {
        console.log(err);
    });
});

const getData =  async(resource) => {
    const response = await fetch(resource);
    if(response.status != 200){
        throw Error('Data not fetched.');
    }
    else{
        const data = await response.json();
        console.log(data);
        return data;
    }
}