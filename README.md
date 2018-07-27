Este proyecto se realizo con [Create React App](https://github.com/facebookincubator/create-react-app).

Puede ver el sitio [oprimiendo click aqui](https://allensmilko.github.io/prueba-Youse-ToDo/).

## Indice

- [Especificaciones del desarrollo](#especificaciones-del-desarrollo)
- [Instalación y despliegue](#instalacion-y-despliegue)
- [Bugs](#bugs)


## Especificaciones del desarrollo

El desarrollo esta enfocado a una prueba de selección para desarrollador front-end contiene las siguientes caracteristicas:

* `usuarios` La aplicación trae usuarios de una API y los crea den un estado local (No se ve reflejado en la API a pesar de que envia la petición post y responde con un id nuevo de usuario).
* `Tareas` Se trae las tareas asignadas a un usuario , elimina, y completa las que se  eligen como completas tambien las crea de manera local.

* `Enrutamiento` El enrutamiento es simple  solo tiene la vista de lista de usuarios y cuando se selecciona el usuario se pasa a la vista de detalle del usuario que contiene un id como parametro en la url que ayuda a traer datos de la API.

## instalacion y despliegue

* Como requerimiento basico debe tener instalado Nodejs en el ordenador
* Clone el proyecto con git ejecutando el siguiente comando  `git clone https://github.com/allensmilko/prueba-Youse-ToDo.git`
* Instale los modulos de nodejs con el siguiente comando `npm install`
* Corra el proyecto con el siguiente comando `npm start`

## Bugs

* El proyecto corre localmente de forma correcta pero al desplegar en github pages no lo hace.
* No funciona  la opción de editar el Todo.
* A pesar de que crea y elimina  objetos apuntando hacia la API , los cambios solo se reflejan de forma local, la API funciona como Dummy de ejemplo.
