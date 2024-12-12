*(descripción original de la prueba disponible más abajo)*

### Solución de una prueba técnica y algunos pensamientos tras terminarla

Para el puesto de desarrollador front con Vue, consiste de 2 partes:
- conexion con API externo para una página de login
  - he creado una nueva carpeta de servicios para agrupar allí todo el código relacionado a las llamadas API
  - he creado un sistema muy basico de validación de campos
  - he renombrado el componente 'Login' a 'LoginView' siendo buena practica en Vue usar min. 2 palabras para el nombre del componente (o requisito trabajando con web components, cómo es mi caso)
  - he añadido botón de reseteo del formulario para facilitar las pruebas y simular un formulario real
  - he cambiado un poco la maqueta teniendo en cuenta html semántico y accesibilidad
- fixear funcionamiento de añadir producto a favoritos
  - he identificado varios problemas en el funcionamiento:
    - no se enviaba correctamente el evento
    - el handler no procesaba bien la información y devolvía un array de funciones no de productos
    - con cada click se intentaba procesar siempre todo el array de los productos en lugar de trabajar solo con el seleccionado
  - he cambiado un poco la maqueta teniendo en cuenta html semántico y accesibilidad
  - hice pequeño cambio en css para que los productos en mobile se pintasen en una columna en lugar de 2, porque en version mobile el grid se desmontaba completamente


El ejercicio está hecho con Vue 2 y JavaScript. He dejado comentarios más detallados directamente en el código.

Para hacer las pruebas es necesario instalar el repo:

```
npm install
npm run serve
```

Para una login con exito se puede usar p.ej. estos credenciales:

```
usuario: mor_2314
contraseña: 83r5^_
```

---

**Pensamientos varios tras concluir la prueba:**

Llevo años sin hacer pruebas técnicas y he decidido tomarmela con calma. Quería ver yo misma el progreso que hize durante estos años, cómo he mejorado, en que aspectos me iba a fijar, que cosas me vienen natural, cuáles todavía me cuestan. Me ha sorprendido lo bien que lo he pasado, es una prueba sencilla y ha sido super relajante comparando con los retos tipicos de mi día a día, especialmente que llevo una semana durísima 😅

A la vez soy conciente de que se podía mejorar, **me hubiera gustado p.ej.:**
- crear componentes bases para elementos de ui
- separar el componente de formulario de la vista de login
- añadir cosas extra en la maquetación
- revisar tamaños usados en css porque a veces se usa rem, a veces px
- añadir funcionalidad de logout

Pero al final para no volverme loca tuve que ponerme un limite de tiempo, que dormir también es necesario.

He decidido no apoyarme en ningúna librería externa aparte de las que ya estaban usadas en el proyecto, como Bootstrap. He tenido que añadir una dependencia extra, que la necesitaba Bootstrap. Según mi experiencia, no siempre se puede añadir cualquier librería al proyecto. En cuanto a **Bootstrap**, no lo he usado nunca, así que intente 'tocar algo' para salir de la prueba con algún conocimiento nuevo.

Mi intención inicial era resolver la prueba usando los tests, por lo menos unos básicos, pero me quede corto de tiempo. En mi trabajo no usamos tests unitarios, es algo que estoy explorando y practicando por mi cuenta (Vitest y Cypress). **He intentando usar Vitest en la prueba**, pero el proceso de instalación y compatibilidad de entorno (Node 14) me ha ganado. Al no poder dedicar más tiempo la prueba se quedo sin tests. Me gustaría tenerlo más interiorizado, igual para las siguientes pruebas, cuándo me tocan.

He mencionado tiempo en 2 o 3 ocasiones ya - a veces no soy la más rápida programando, soy la que asegura entregas de proyecto con exito. En total **la prueba me llevo al rededor de 6h** (sin contar el tiempo para preparar este readme), aunque divididas entre partes pequeñas ya que tenía que ir resolviendola fuera de la jornada laboral.

En la prueba intente mejorar no solo la funcionalidad sino también: usar html semántico, ajustes en CSS, accesibilidad - siempre pongo enfoque en todos estos aspectos, no solo en JS.

En mis proyectos personales prefiero usar inglés para los comentarios y commits, sin embargo cómo el código base tenía **comentarios en español**, he seguido esta dirección. Al final en los proyectos siempre hay normas establecidas y veo más importante la coherencia que preferencias de cada desarrollador. Sin embargo los commits los he dejado en ingles.

He usado ChatGPT para intentar resolver el problema de la instalación de vitest pero para nada más. Todas las dudas resolvía basandome en la documentación oficial (Vue, FakeApi, Bootstrap) y StackOverflow.

Hasta aquí, una muestra de cómo trabajo. Eso si, es solo una muestra, espero poder hablar en más profundidad durante la entrevista. Gracias por dedicar vuestro tiempo para revisar mi solución 🙃

---

# Enunciado original:

¡Bienvenido a la prueba técnica! En ViveLibre, trabajamos con un stack tecnológico que abarca Vue.js, Javascript, TypeScript y diversas tecnologías de comunicación en tiempo real como SIP, Asterisk, SSE (Server-Sent Events), y WebSockets. Buscamos un desarrollador frontend con una sólida comprensión de JavaScript y Vue para reforzar nuestro equipo.

La prueba técnica consta de dos partes, y su objetivo es evaluar tus habilidades para trabajar con tecnologías frontend modernas, identificar y corregir errores, y desarrollar soluciones funcionales de manera eficiente.


## Instrucciones

Hemos preparado un [repositorio](https://github.com/desarrollo-vivelibre/frontend-test) que contiene un proyecto que simula una parte de una aplicación real. El proyecto tiene algunos errores y funcionalidades incompletas que debes corregir. Deberás hacer un fork del repositorio, trabajar sobre los fallos/requisitos especificados, subir los commits separados y ordenados, y luego comparte con nosotros el repositorio con tus soluciones.

### **Parte 1: Implementación de Login**
En esta parte de la prueba, el diseño del login ya está maquetado, pero la funcionalidad aún no está implementada. Tu tarea es:

Implementar la funcionalidad de login:
- Debes conectar el formulario de login con un sistema de autenticación simulado  utilizando una [API externa](https://fakestoreapi.com/).
- Validar el formulario, asegurándote de que los campos requeridos han sido rellenados y los valores de entrada sean correctos (por ejemplo, usuario y contraseña).
- Implementar un sistema de mensajes de error o éxito para notificar al usuario el estado de la autenticación. En caso de que la autenticación sea exitosa, el token debe ser persistido en el navegador.
- Una vez autenticado, redirigir al usuario a una vista principal o dashboard.
- Los estilos actuales son muy básicos, por lo que si lo prefieres, puedes mejorar su apariencia, usabilidad o experiencia de usuario(Esto es totalmente opcional).

### **Parte 2: Funcionalidad de Productos Favoritos**
En la segunda parte de la prueba, se requiere que corrijas un fallo relacionado con la funcionalidad de "productos favoritos". Actualmente, los usuarios pueden marcar productos como favoritos, pero la funcionalidad no está funcionando correctamente.

Revisar y corregir la funcionalidad de favoritos:
El sistema debería permitir a los usuarios seleccionar y deseleccionar productos como favoritos.
Esta funcionalidad contiene algunos problemas. **Explica detalladamente con comentarios la causa de los errores encontrados y como los has solucionado.**

**Pautas de Evaluación**
- Calidad del código: Legibilidad, estructura, y buenas prácticas.
- Resolución de problemas: Habilidad para identificar y corregir errores.
- Funcionalidad completa: Cumplimiento de los requisitos y funcionamiento correcto de las funcionalidades.
- Documentación: Descripción clara de los cambios realizados con comentarios en el código.

**¡Buena suerte y gracias por participar en el proceso de selección!**

### Environment
```
Node V14.20.1
NPM V7.10.0
VueJs 2
Javascript
```

### Prepare for development
```
npm install
npm run serve
```

### External API
https://fakestoreapi.com/

### PAGES
- [" /"] Main - Products List
- [" /login"] Authentication