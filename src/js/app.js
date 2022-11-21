//Al utilizar Parcel evito poner -> assert {type: "json"};
import data from "./data.json";

const barsContainer = document.querySelector(".bars-section__bars-wrapper");

//Esto es para poder acceder a los valores en un arreglo junto al metodo push que esta en el forEach de abajo
let values = [];

data.forEach((element) => {
  values.push(element.amount);
  barsContainer.innerHTML += `
  <div class="bars-section__bar-wrapper">
    <p class="bars-section__price">$${element.amount}</p>
    <div class="bars-section__progress-bar"></div>
    <p class="bars-section__day">${element.day}</p>
  </div>`;
});

// Se utiliza el operador spread sino da NaN
// Y aqui se almacena el valor maximo del json
let alturaMaxBar = 15; //son rem
let maxValue = Math.max(...values);

/* Calcular la altura de las barras.

Valor max en el json     = 52.36
Altura max de las barras = 15rem
Valor de ejemplo         = 17.45

Para calcular la altura:

52.36 - 15rem
17.45 -  x

x = (17.45 . 15rem) / 52.36 
alturaActualpx = (nuevoValor * alturaMaxima ) / maximoValor

*/

let bars = document.querySelectorAll(".bars-section__bar-wrapper");
bars = [...bars];

// console.log(day.innerText) mon-tue-wed-thu debajo de las barras
// fecha actual get Date().getDay dia de la semana actual expresado en string [ en la variable let d ] (AHORA DA MON)

// Se utiliza el operador spread para poder acceder a mas propiedades del objeto, ya que el querySelectorAll trae una lista de nodos (los cuales no tienen tantos metodos).

bars.forEach((bar) => {
  let nuevoValor = parseFloat(bar.childNodes[1].innerText.slice(1));

  let alturaActualpx = (nuevoValor * alturaMaxBar) / maxValue;

  bar.childNodes[3].style.height = `${alturaActualpx}rem`;

  //Gracias a la logica que esta arriba si el valor maximo llegase a cambiar las demas barras se veran con un tamaño respectivo (es decir mas pequeñas o grandes)

  // Logica para pintar la barra de color segun el día de la semana

  let d = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  let fechaActual = new Date();
  let fechaString = d[fechaActual.getDay()];

  if (fechaString === "mon") {
    bars[0].childNodes[3].style.backgroundColor = "hsl(186, 34%, 60%)";
  } else if (fechaString === "tue") {
    bars[1].childNodes[3].style.backgroundColor = "hsl(186, 34%, 60%)";
  } else if (fechaString === "wed") {
    bars[2].childNodes[3].style.backgroundColor = "hsl(186, 34%, 60%)";
  } else if (fechaString === "thu") {
    bars[3].childNodes[3].style.backgroundColor = "hsl(186, 34%, 60%)";
  } else if (fechaString === "fri") {
    bars[4].childNodes[3].style.backgroundColor = "hsl(186, 34%, 60%)";
  } else if (fechaString === "sat") {
    bars[5].childNodes[3].style.backgroundColor = "hsl(186, 34%, 60%)";
  } else if (fechaString === "sun") {
    bars[6].childNodes[3].style.backgroundColor = "hsl(186, 34%, 60%)";
  }

  bar.addEventListener("mouseenter", (event) => {
    let priceElement = event.target.childNodes[1];
    priceElement.style.opacity = 1;
  });
  bar.addEventListener("mouseleave", (event) => {
    let priceElement = event.target.childNodes[1];
    priceElement.style.opacity = 0;
  });
});

//mouseover toma en cuenta los hijos del elemento
//mouseenter al elemento mismo
