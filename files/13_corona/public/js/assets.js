let infected = document.querySelector('.inf').innerHTML;
let cured = document.querySelector('.cured').innerHTML;
let dead = document.querySelector('.dead').innerHTML;

let data = new Array();

const getNumber = (param) => {
    var str = '';
    for(i = 0; i < param.length; i++){
        if(param[param.length-(i+1)] != ' '){
            str = param[param.length-(i+1)] + str;
        }
    }
    if(isNaN(parseInt(str))){
        throw Error('Data you are trying to parsed does not have an integer value.');
    }
    return parseInt(str);
}

data[0] = getNumber(infected);
data[1] = getNumber(dead);
data[2] = getNumber(cured);

console.log(data);

var ctx = document.getElementById('myChart_2').getContext('2d');
var chart_2 = new Chart(ctx,{
    type: 'doughnut',
    data: {
        labels: ['Infikováno','Úmrtí','Vyléčeno'],
        datasets: [{
            backgroundColor: ['rgba(245, 144, 66,1)','rgba(245, 66, 66,1)','rgba(66, 245, 129,1)'],
            borderColor: 'white',
            borderWidth: 0,
            borderAlign: 'center',
            hoverBackgroundColor: 'grey',
            hoverBorderColor: 'white',
            hoverBorderWidth: 0,
            
            data: data
        }]
    },
    options: {
        cutoutPercentage: 40,
        rotation: 0.8*Math.PI,
        circumference: 1.4*Math.PI,
        animation: {
            animateRotate: true,
            animateScale: false
        }
    }
})