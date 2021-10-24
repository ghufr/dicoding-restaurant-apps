import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import { restaurants } from "../DATA.json";

const hamburgerElement = document.querySelector("#hamburger");
const drawerElement = document.querySelector("#drawer");
const mainElement = document.querySelector("main");

hamburgerElement.addEventListener("click", (e) => {
  drawerElement.classList.toggle("open");
  e.stopPropagation();
});

mainElement.addEventListener("click", (e) => {
  drawerElement.classList.remove("open");
  e.stopPropagation();
});

restaurants.forEach((resto) => {
  const container = document.querySelector(".restos");
  const restoTemplate = document.querySelector(".resto-template");
  const children = restoTemplate.content.cloneNode(true);

  // restoImg
  const restoImg = children.querySelector(".resto-item__thumbnail");

  restoImg.setAttribute("src", resto.pictureId);
  restoImg.setAttribute("alt", "Foto " + resto.name);

  const restoName = children.querySelector(".resto-item__title a");
  restoName.setAttribute("href", "#");
  restoName.innerHTML = resto.name;

  // restoLocation
  children.querySelector(".resto-item__location_label").innerHTML = resto.city;

  children.querySelector(".resto-item__description").innerHTML =
    resto.description.slice(0, 80);

  children.querySelector(".resto-item__rating").children[2].innerHTML =
    resto.rating;

  container.appendChild(children);
});
