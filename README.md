# Weather App

Proyecto de práctica realizado siguiendo las especificaciones e historias de usuarios planteados en el desafio de [devchallenges](https://devchallenges.io/).

## ¿Qué aprendí con este proyecto? 🙇
Realmente en este proyecto no utilicé ninguna herramienta completamente nueva, sino que seguí practicando con las ultimas que he venido aprendiendo. Sin embargo a mitad del proyecto cuando quise hacer la llamada a la api tuve muchos problemas, ya que ésta no es compatible con CORS. La primera solución que encontré fue hacer mi propio pequeño backend usando node y express para desde ahi poder especificar los headers correspondientes. Y sorprendentemente ¡funcionó!. Pero unicamente en local. Cuando realice el primer deploy de la aplicación volví a tener el mismo problema. Despues de una tarde muy frustrante ¡encontre la solución!. Configuré mi propio proxy utilizando [mycorsproxy](https://mycorsproxy-crossdomainyz.herokuapp.com/) y asi fue como pude finalizar el proyecto.

## Historias de usuario 📝

* Puedo ver el clima de la ciudad por defecto, preferiblemente mi ubicación actual ✔️
* Puedo buscar ciudad ✔️
* Puedo ver el clima de hoy y los próximos 5 días ✔️
* Puedo ver la fecha ✔️
* Puedo ver un icono correspondiente para cada tipo de clima ✔️
* Puedo ver el grado mínimo y máximo cada día ✔️
* Puedo ver el estado del viento y la dirección del viento ✔️
* Puedo ver el porcentaje de humedad ✔️
* Puedo ver un indicador de visibilidad ✔️
* Puedo ver el número de presión de aire ✔️
* Puedo solicitar el clima de mi ubicación actual ✔️
* Puedo convertir la temperatura en Celsius a Fahrenheit y viceversa ✔️

## Construido con 🛠️

* [React](https://es.reactjs.org/) - La libreria utilizada
* [Sass](https://sass-lang.com/) - Para los estilos
* [Metaweather](https://www.metaweather.com/api/) - Api consumida
* [Git](https://git-scm.com/) - Para el control de versiones

## Autores ✒️

* **Agustín Vera** - *Trabajo Inicial* - [ronedev](https://github.com/ronedev)

## Licencia 📄

Este proyecto está bajo la Licencia MIT

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invitame una cerveza 🍺 o un café ☕. 
* Da las gracias públicamente 🤓.



---
⌨️ con ❤️ por [ronedev](https://github.com/ronedev) 😊
