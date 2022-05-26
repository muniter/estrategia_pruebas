# Pruebas manuales

[Inventario de pruebas manuales exploratorias](https://docs.google.com/spreadsheets/u/0/d/1TR15trADeCwL9MpPPKpiI_Uum6LLXTJB478EpZiyrg0/export?format=pdf)

| #    | Título                                                                                                                                       | Video                                                                                     |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1    | Login functionality: Registrar y autentificar                                                                                                | [#1](https://drive.google.com/file/d/1CCSZe6gBh5LFhxJMOwvu8eY69uOlo1dg/view?usp=sharing)  |
| 2    | Post functionality: Crear y editar un post                                                                                                   | [#2](https://drive.google.com/file/d/1nADJalUA2SUlxGrFjB0nZ1ct8pIrOTP_/view?usp=sharing)  |
| 3    | Post functionality: Editar el post para no publicarlo y luego eliminarlo                                                                     | [#3](https://drive.google.com/file/d/19SpzbGjfNe3CuZKrm1QMJWUKzcc6kE_g/view?usp=sharing)  |
| 4    | Member functionality: Crear un nuevo miembro, personificar el nuevo miembro a través de un link y editar su información.                     | [#4](https://drive.google.com/file/d/1gtazMUjGUI_B38gaQMC6PZtZfJbSfPtl/view?usp=sharing)  |
| 5    | Member functionality: Crear un segundo miembro con los datos repetidos y eliminar el segundo miembro.                                        | [#5](https://drive.google.com/file/d/1mdlhPpE8fhN5t665xRIta04g8dD1P0Jo/view?usp=sharing)  |
| 6    | Tag & Post functionality: Crear un tag y asociarla a 2 post                                                                                  | [#6](https://drive.google.com/file/d/1nTuFe50i3N5aqkgHMzcpa60niNeTQzaF/view?usp=sharing)  |
| 7    | Staff functionality: Modificar la información y cambiar la contraseña de un Staff, luego verificarlo                                         | [#7](https://drive.google.com/file/d/17NftAwkiXhyKXtUgHrG3ZEB3Dy_-6G_7/view?usp=sharing)  |
| 8    | Staff & Login functionality: Validar los datos que se modifiquen en un staff previo ha ser cambiados y por ultimo inciar sesión nuevamente   | [#8](https://drive.google.com/file/d/1M2zufLGuXivxTjHDnEJmCWhguTC7NOZt/view?usp=sharing)  |
| 9    | Page functionality: Acciones en Page                                                                                                         | [#9](https://drive.google.com/file/d/1zjBIUFZbWUxZApA9Xi1GjD9wPrha9W6A/view?usp=sharing)  |
| 10   | Page functionality: Navegación hacia un nuevo elemento en el navbar                                                                          | [#10](https://drive.google.com/file/d/1X-PANuxiXK62tPYYS0UuEyL6U7M-RuAx/view?usp=sharing) |

## 1. Registrar y autentificar

### Comportamiento Actual

Al intentar ingresar a Ghost es necesario registrarse primero. Luego es posible hacer login a través de un correo y una contraseña de 10 dígitos.

### Comporamiento Esperado

Luego de registrarse y hacer Log In con los datos ingresados correctamente, se redirige al _Dashboard_

### Pasos para reproducir

1. Ir a http://localhost:9333/ghost/
2. Llenar y registrar los datos.
3. Ir a la sección _Explore Ghost admin_
4. Seleccionar _Sing out_ a través del drowndow colocado en la para inferior izquierda.
5. Ir nuevamente a http://localhost:9333/ghost/
6. Hacer Log In

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```

## 2. Crear y editar un post

### Comportamiento Actual

Se puede crear un nuevo post, publicarlo y editarlo; en cada uno de estas actvidades los cambios se ven actualizados.

### Comporamiento Esperado

Luego de publicar un post se puede verificar que efectivamente esta publicado, de igual manera si este se edita se debe actualizar correctamente.

### Pasos para reproducir

1. Ir a _Posts_
2. Dar clic en _+_ al lado de Posts o en _New Post_
3. Llenar los campos y seleccionar las opciones de _Publish_
4. Verificar que el post se publicó correctamente.
5. Ingresar nuevamente al post desde la lista de posts y editarlo
6. Verificar los cambios

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```

## 3. Editar el post para no publicarlo y luego eliminarlo

### Comportamiento Actual

Se puede editar el post para que no este publicado, luego se verifica que se encuentra en estado _unpublished_. Como una acción adicional se puede eliminar el post desde la sección de _Settings_ dentro de la misma edición del Post.

### Comporamiento Esperado

Desde la edición de un Post se puede configurar el post como _unpublished_ y tambien se puede eliminar el post.

### Pasos para reproducir

1. Ir a _Posts_
2. Seleccionar un Post para editar.
3. Seleccionar las opciones de _Update_ y elegir _unpublish_
4. Verificar que el post cambió su estado a _unpublished_ correctamente. En la lista de _Posts_
5. Ingresar nuevamente al post para eliminarlo.
6. Desde un botón que se encuentra en la parte superior derecha, al desplegar la sección _Settings_
7. Navegar hasta el final de la sección, dar clic en _Delete post_ y confirmar la acción.
8. Verificar desde la lista de _Posts_ que el Post se eliminó.

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```

## 4. Crear un nuevo miembro, personificar el nuevo miembro a través de un link y editar su información.

### Comportamiento Actual

Se puede crear un miembro al llenar la forma para la creación y dar clic en _Save_; luego de su creación se puede personificar para ingresar a Ghost como un miembro y a su vez se puede editar su información. Esto actualizará los datos en la lista de miembros desde la página del administrador.

### Comporamiento Esperado

Se puede personificar un miembro creado a través de un link, editar la información del miembro. La información se debe ver actualizada en la lista de miembros desde la página del administrador.

### Pasos para reproducir

1. Ir a _Members_
2. Crear un _New member_ al llenar sus datos y dar clic en _Save_
3. Desde el ícono de engrane, seleccionar _impersonate_
4. Copiar y pegar el link para ingresar como el miembro creado. (Este link será válido durante 24 horas)
5. Si se da clic en _Account_ se puede verificar desde que miembro se tiene acceso.
6. Al dar clic en _Edit_ y editar los campos.
7. Dar clic en _Save_
8. Verificar desde la lista de _Members_ del administrador, que los cambios se efectuaron.

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```

## 5. Crear un segundo miembro con los datos repetidos y eliminar el segundo miembro.

### Comportamiento Actual

Se puede crear un miembro con el mismo nombre de un miembro existente, pero no con un correo que haya sido registrado para otro miembro.

### Comporamiento Esperado

No se debería poder crear un segundo miembro con el mismo nombre de un miembro ya registrado; los campos de email y nombre deberían ser únicos.

### Pasos para reproducir

1. Ir a _Members_
2. Crear un _New member_ al llenar sus datos y dar clic en _Save_
3. Ir a nuevamente*Members*
4. Crear un _New member_ al llenar sus datos repetir solo el Nombre del miembro anterior y dar clic en _Save_
5. Verificar que los dos miembros tienen el mismo nombre.
6. Dar clic en el miembro a editar y cambiar el email por el mismo email que el primer miembro.
7. No se podrá guardar la información, por lo que se mostrará una alerta.
8. Dar clic en el icono de engrane y seleccionar _Delete member_
9. Verificar desde la lista de _Members_ que el miembro que se estaba editando se eliminó.

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```

## 6. Crear un tag y asociarla a 2 post

### Comportamiento Actual

Al crear un tag se valida cada uno de los campos y en especial el campo color, si el mismo no es definido se toma un valor por defecto definido por Ghost. Para asociar la tag a los posts se necesita ubicarse dentro de la zona de edición de cada post.

### Comporamiento Esperado

Se espera que despues de crear el tag se pueda asociarlo a los posts existentes y a los futuros post

### Pasos para reproducir

1. Ir a _Tags_
2. Crear un _New tag_ al llenar sus datos y dar clic en _Save_
3. Ir a nuevamente _Tags_
4. Verificar que el tag este creado y se evidencia que ningún post esta asociado al mismo.
5. Ir a _Posts_
6. Editar un post y añadir el tag dentro de la seción de _Settings_ (ícono en la parte superior derecha)
7. Verificar que el post tiene el tag creado.
8. Crear un nuevo post y añadir el tag dentro de la seción de _Settings_.
9. Verificar que el post tiene el tag creado.
10. Ir a _Tags_ y verificar que la tag creada al inicio tiene asociado dos posts.

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```

## 7. Modificar la información y cambiar la contraseña de un Staff, luego verificarlo

### Comportamiento Actual

Desde la sección de _Staff_ se elige el staff que se quiere modificar; es posible editar la información y la clave. Hace log In con la nueva contraseña.

### Comporamiento Esperado

Se puede elegir el staff que se quiere modificar, desde la sección _Staff_; además de editar la información y la clave. Este último sin no antes colocar la contrseña antigua para verificar el cambio de contraseña. Una vez cambiada la contraseña se puede hacer log In con los datos actualizados.

### Pasos para reproducir

1. Dar clic en el ícono de engrane que abre _Settings_
2. Dentro de la sección de configuración elegir _Staff_
3. Elegir el staff sobre el cúal se busca hacer los cambios
4. Llenar el campo de _Website_ y probar con links tipeados en ese momento y finalmente copiar un link de Google.
5. Dar clic en _Save_
6. Llenar los datos necesarios para cambiar la contraseña.
7. Ir al dropdown representado por el avatar y elegir la opción _Sing out_
8. Ingresar el email, la nueva contraseña y dar clic en _Sing In_

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```

## 8. Validar los datos que se modifiquen en un staff previo ha ser cambiados y por ultimo inciar sesión nuevamente

### Comportamiento Actual

Desde la sección de _Staff_ se elige el staff que se quiere modificar; es posible editar la información, entre esa información se modificó el email con el que se autentifica el staff.

### Comporamiento Esperado

Se puede elegir el staff que se quiere modificar, desde la sección _Staff_; además de editar la información, como el email. Una vez cambiado el email se puede hacer log In con los datos actualizados.

### Pasos para reproducir

1. Dar clic en el ícono de engrane que abre _Settings_
2. Dentro de la sección de configuración elegir _Staff_
3. Elegir el staff sobre el cúal se busca hacer los cambios
4. Llenar y probar cuales son las validaciones de los diferentes campos. Cambiar el email.
5. Dar clic en _Save_
6. Ir al dropdown representado por el avatar y elegir la opción _Sing out_
7. Ingresar el nuevo email email, la contraseña y dar clic en _Sing In_

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```

## 9. Acciones en Page

### Comportamiento Actual

Se puede crear un _Page_ con el nombre de un page existente, otra acción que se puede realizar a más de editar es eliminar el page.

### Comporamiento Esperado

No esta descrito pero se esperaria que el nombre del page sea único, de no ser así no se podría publicarlo, al igual que si se edita un page para que este tenga un nombre que ya posee otro page no se debería poder actualizar.

### Pasos para reproducir

1. Ir a _Pages_
2. Dar clic en _New Page_
3. Llenar los campos (Titulo repetido a un page existente) y dar clic en _Publish_
4. Verificar la publicación del Page
5. Editar el nuevo Page.
6. Dar clic en _Update_ y verificar los cambios.
7. Dar clic en el icono de la parte superior derecha.
8. Deslizar la sección _Settings_ hasta el final.
9. Dar clic en _Delete page_ y confirmarlo
10. Verfificar que el page se ha borrado.

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```

## 10. Navegación hacia un nuevo elemento en el navbar

### Comportamiento Actual

Se agregó una nueva sección en el navbar del sitio que redirija hacia un nuevo page. Durante la creación o edición del page se puede modificar el url.

### Comporamiento Esperado

En el apartado de _Navigation_ se puede crear secciones en el navbar para que se pueden asociar esos urls a nuevas pages. Si en _Navigation_ no se agrega el nombre de la sección no se podrá guardar los cambios.

### Pasos para reproducir

1. Dar clic en el icono de engrane que se encuentra en la parte inferior izquierda, dirije a _Settings_.
2. Dar clic en _Navigation_
3. Agregar en _Primary Navigation_, el nombre de la sección y modificar el url
4. Luego dar clic en _Save_.
5. Ir a _Pages_
6. Dar clic en _New page_
7. Llenar los campos.
8. Ir a _settings Page_ por medio del botón ubicado en la parte superior derecha.
9. Editar el _Page Url_
10. Publicar el page dando clic en _Publish_
11. Verificar que la sección del Navbar este asociada al nuevo page.

### Contexto

```
Ghost: 4.41.1
Instalación: Docker container
Database: sqlite
OS: Win 10
Browser: Chrome 100
```
