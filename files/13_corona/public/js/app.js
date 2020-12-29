var ctx = document.getElementById('myChart').getContext('2d');
var pocet = new Array();
var dny = new Array();

const getCovid = async(resource) =>{
    const response = await fetch(resource);
    if(response.status != 200){
        throw Error('Data not fetched.');
    }
    const data = await response.json();
    return data;
}

getCovid('https://onemocneni-aktualne.mzcr.cz/api/v1/covid-19/nakaza.json')
    .then(({data}) =>{
        for(i = 0; i < 7; i++){
            pocet[i] = data[(data.length-1)-(6-i)].pocetDen;
            dny[i] = data[(data.length-1)-(6-i)].datum;
        }

        var chart = new Chart(ctx,{
            type: 'bar',
            data: {
                labels: dny,
                datasets: [{
                    label: 'corona virus denní přírůstky za posledních 7 dní',
                    backgroundColor: 'rgba(26, 219, 203,0.7)',
                    borderColor: 'rgba(74, 255, 140,0.2)',
                    borderWidth: 5,
                    pointHitRadius: 10,
                    fill: 'origin',
                    data: pocet
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        barThickness: 45,
                        maxBarThickness: 50
                    }]
                }
            }
        });
    })
    .catch((err) => {
        console.log(err);
    });




