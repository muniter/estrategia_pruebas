# Resultados Semana 1

## Inventario de pruebas producido

Leyenda:

Week: Semana en la que la prueba fue desarrollada.
Descripción: que nivel con estilo de prueba es.


| #     | Week | Descripción | Nombre                                                                                                                                       |
| ----- | ---- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------  |
| 1     | 1    | E2E & VRT   | Member functionlaity -> Create member (+)                                                                                                    |
| 2     | 1    | E2E & VRT   | Member functionlaity -> Create member with same name (+)                                                                                     |
| 3     | 1    | E2E & VRT   | Member functionlaity -> Create member invalid email (-)                                                                                      |
| 4     | 1    | E2E & VRT   | Member functionlaity -> Create member without name (+)                                                                                       |
| 5     | 1    | E2E & VRT   | Member functionlaity -> Create member duplicate email                                                                                        |
| 6     | 1    | E2E & VRT   | Member functionlaity -> Create member retry (+)                                                                                              |
| 7     | 1    | E2E & VRT   | Member functionlaity -> Delete member (+)                                                                                                    |
| 8     | 1    | E2E & VRT   | Member functionlaity -> Filter member (+)                                                                                                    |
| 9     | 1    | E2E & VRT   | Member functionlaity -> Filter member delete (+)                                                                                             |
| 10    | 1    | E2E & VRT   | Member functionlaity -> Filter member remove label (+)                                                                                       |
| 11    | 1    | E2E & VRT   | Post functionlaity -> Create post (+)                                                                                                        |
| 12    | 1    | E2E & VRT   | Post functionlaity -> Create post without content (+)                                                                                        |
| 13    | 1    | E2E & VRT   | Post functionlaity -> Create multiple post with the same title (+)                                                                           |
| 14    | 1    | E2E & VRT   | Post functionlaity -> Create post and edit it (+)                                                                                            |
| 15    | 1    | E2E & VRT   | Post functionlaity -> Create post and delete it (+)                                                                                          |
| 16    | 1    | Manual Ex   | Login functionality -> Registrar y autentificar                                                                                              |
| 17    | 1    | Manual Ex   | Post functionality -> Crear y editar un post                                                                                                 |
| 18    | 1    | Manual Ex   | Post functionality -> Editar el post para no publicarlo y luego eliminarlo                                                                   |
| 19    | 1    | Manual Ex   | Member functionality -> Crear un nuevo miembro, personificar el nuevo miembro a través de un link y editar su información.                   |
| 20    | 1    | Manual Ex   | Member functionality -> Crear un segundo miembro con los datos repetidos y eliminar el segundo miembro.                                      |
| 21    | 1    | Manual Ex   | Tag & Post functionality -> Crear un tag y asociarla a 2 post                                                                                |
| 22    | 1    | Manual Ex   | Staff functionality -> Modificar la información y cambiar la contraseña de un Staff, luego verificarlo                                       |
| 23    | 1    | Manual Ex   | Staff & Login functionality -> Validar los datos que se modifiquen en un staff previo ha ser cambiados y por ultimo inciar sesión nuevamente |
| 24    | 1    | Manual Ex   | Page functionality -> Acciones en Page                                                                                                       |
| 25    | 1    | Manual Ex   | Page functionality -> Navegación hacia un nuevo elemento en el navbar                                                                        |

## Herramientas Usadas

#### Playwright

- Su lenguaje robusto, da gran facilidad para escribir las pruebas, permitiendo detallar bastante cada una de ellas.

- Permite realizar DEBUG con puntos de depuración, que adicional, resalta el elemento en el navegador, mostrando visualmente en que parte de la prueba se encuentra.

- Gran ergonomía en su configuración y runner se pueden pasar opciones como `--headed` `--workers` `--repeat-each N` y muchas más que permiten dar una visión general de como están las pruebas y concentrase en una en específico. También se destaca mucho la habilidad de **escoger cual prueba se quiere correr** pasando un flag como `-g 'my test'` para filtrar solo los test que hagan match con el string.
    * La gran ergonomía **es algo invaluable**, pues en pruebas e2e de interfaz flaky es la regla y no la excepción!

- Tiene una amplia documentación, increíblemente descriptiva con todos sus métodos documentados. Que permiten **facilmente** encontrar las funciones necesarias. Acompañado de tutoriales y ejemplos completos y actualizados.

- Excelente reportes y feedback, el output que genera cuando hay fallas es excelente con pantallazos, y bien descrito que punto de la prueba generó la excepción mostrando las lineas incluso con syntax highlighting, esto hace que sea mucho más fácil entender los errores.

- La funcionalidad de sus `Selector` es excelente para encontrar los elementos necesario, un API muy completa y robusta.

- Excelente code-completion/code-intelligence gracias a el correcto uso de TypeScript (tipado completamente) permite saber que es cada cosa en cada contexto de ejecución.

- Permite correr los escenarios en paralelo para rápido feedback localmente.

- La instalación es realmente sencilla sin depender de versiones específicas o versiones anterioes de las herramientas utilizadas para su instalación y ejecución de pruebas, como el entorno de ejecución (NodeJs), la librería para generar datos aleatorios (Faker), etc.

- Posee varios accesorios (fixtures) que ofrecen un entorno de pruebas robusto para las pruebas E2E, adicional se pueden agregar accesorios propios que serán preparados para la ejecución de las pruebas.

- Reportes (screenshots) paso a paso, debugging de alta calidad.

- Todo el dinero de Microsoft para apoyar su desarrollo.

### RessembleJS

#### Pros

1. Sencilla: es una herramienta que expone una interfaz simple para lo que se quiere hacer, la comparación de dos imágenes, y retorna lo necesario para hacer el procesamiento propio.
1. Documentación: en el README del proyecto se encontraba claramente como hacerla funcionar, y en que se basa para hacer sus comparaciones.
1. Probada, es una herramienta usada por muchas personas como se evidencia en Github, por lo cual está bastante pulida y no se encuentran *rough edges* cuando se usa.

#### Contra

1. Rendimiento: puede ser un poco lenta al momento de comparara las imágenes, sin embargo para nuestro caso de uso que no requiere baja latencia no es problemático.

### Github Actions con AWS

**En esta estrategía Github Actions utiliza [hosted runners](https://github.com/machulav/ec2-github-runner) con nuestro presupuesto de AWS.**

#### Pros

- Muy fácil de escribir los pasos de ejecución
- Resultados rápdios, muy buen feedback loop
- Mucha documentación existente
- Fácil de aprender
- Gratis en el nivel de uso requerido
