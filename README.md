# Automated Software Testing

This repository is an educational assignment.

- Aplicación bajo pruebas: [Ghost](https://github.com/TryGhost/Ghost)
- Versión: 4.41.1
- Versión for VRT: 4.36

## Quick Links:

Apartes en la Wiki:

- [E2E Testing Playwright](https://github.com/muniter/e2e_testing_assignment/wiki/E2E)
- [Visual Regression Testing Ressemble JS](https://github.com/muniter/e2e_testing_assignment/wiki/VRT)
- [Data Validation Scenarios](https://github.com/muniter/e2e_testing_assignment/wiki/DV)

Reportes VRT:

- [Playwright VRT](https://muniter.github.io/e2e_testing_assignment/playwright.html)

Instrucciones de ejecución:
  - [E2E Testing](#e2e-testing)
  - [VRT Testing](#visual-regression-testing)
  - [Data Validation Testing](#data-validation-testing)

## Funcionalidades bajo prueba

Las siguientes son las funcionalidades elegidas para realizar las pruebas.

| No  | Nombre                       | Descripción                                                                                                            |
| --- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | **Login**                    | Se puede hacer signin de un usuario registrado previamente.                                                            |
| 2   | **Crear una publicación**    | Se puede crear una publicación, esta es la unidad mínima de contenido de Ghost.                                        |
| 3   | **Editar una publicación**   | Se puede editar todos los detalles de una publicación ya creada.                                                       |
| 4   | **Eliminar una publicación** | Se puede eliminar una publicación ya creada.                                                                           |
| 5   | **Crear un member**          | Se crean los miembros de la página, aquellos que están suscritos a su contenido, se provee un nombre, correo y labels. |
| 6   | **Editar un member**         | Se puede editar todos los datos de un member ya creado.                                                                |
| 7   | **Eliminar un member**       | Se puede eliminar un member ya creado.                                                                                 |
| 8   | **Filtrar members**          | Se puede filtrar los miembros por nombre y otros identificadores.                                                      |
| 9   | **Crear un tag**             | Se puede crear un tag,  llenando todos sus campos                                                                      |

# Instrucciones

Los archivos de playwwright se encuentran en [e2e-playwright/](https://github.com/muniter/e2e_testing_assignment/tree/main/e2e-playwright/tests)

Ambas herramientas están corriendo en **Continuous Integration** en este repositorio, puede [navegar a actions](https://github.com/muniter/e2e_testing_assignment/actions) para ver los últimos resultados de los test, o puede ver el [listado de commits](https://github.com/muniter/e2e_testing_assignment/commits/main) para ver su estado final.

Los workflows, o definición de procedimientos están definidos de la siguiente manera:

1. [Playwright (E2E & Data Validation)](https://github.com/muniter/e2e_testing_assignment/blob/main/.github/workflows/playwright.yml)
1. [Playwright VRT](https://github.com/muniter/e2e_testing_assignment/blob/main/.github/workflows/playwright_vrt.yml#L1)

Estos corren con cada commit a master en el repositorio.

## E2E Testing

Instrucciones para correr pruebas E2E en playwright.

### Playwright E2E

[Ejemplo en CI](https://github.com/muniter/e2e_testing_assignment/blob/main/.github/workflows/playwright.yml)

Instrucciones para instalar en máquina en Unix like systems (Linux, Mac OS (**no probado**)).

#### 1. Instalar dependencias

```bash
npm install
```

#### 2. Instalar dependencias nivel de sistema

- Chromium
- Docker

#### 3. Correr las pruebas:

**NOTA**: El [global setup](https://github.com/muniter/e2e_testing_assignment/blob/main/global-setup.ts) de playwright se encargará de levantar una instancia de Ghost usando un contenedor en el puerto 9333. por lo cual solo el siguiente llamado es suficiente para hacer el bootstrap.

```bash
npm run test-pw-regular
```

**NOTA: este comando se encargará de recrear el contenedor de ghost y su base de datos en cada ocasión que corra**

#### Tips

Si tiene problemas para instalar o correr playwright [dirígase a la guía de instalación](https://playwright.dev/docs/intro#installation)

También le puede servir verificar como las pruebas [automátizadas se definen en CI](https://github.com/muniter/e2e_testing_assignment/blob/main/.github/workflows/playwright.yml)

---
## Visual Regression Testing

Instrucciones para correr pruebas de VRT en playwright.

Actualmente las pruebas de VRT se corren en cada commit de este repositorio, como se puede ver en los siguientes workflows:

- [Playwright VRT](https://github.com/muniter/e2e_testing_assignment/blob/main/.github/workflows/playwright_vrt.yml#L1)

Los resultados son publicados automáticamente a la rama [gh-pages](https://github.com/muniter/e2e_testing_assignment/tree/gh-pages) de este repositorio y por lo tanto se sirve como contenido web en los siguientes links:

- [Playwright VRT results](https://muniter.github.io/e2e_testing_assignment/playwright.html)

Para correr las pruebas en modos VRT se hace necesario lo siguiente:

---
### Playwright VRT

Siga las instrucciones descritas para correr [playwright E2E](#playwright-e2e) **ignorando el paso 3**, y luego:

#### 1. Run the test suite in both Ghost versions

```bash
CI=1 GHOST_VRT=1 GHOST_VERSION=4.41.1 npx playwright test --workers 1
CI=1 GHOST_VRT=1 GHOST_VERSION=4.36 npx playwright test --workers 1
```

#### 2. Artifacts processing and report generation

```bash
npm run reporter -- --process playwright --prev 4.36 --post 4.41.1
```

Esto generará un archivo en la base del repositorio [`playwright.html`](https://muniter.github.io/e2e_testing_assignment/playwright.html).

---
## Data Validation Testing

Instrucciones para correr pruebas de validación de datos en playwright.

Explicación e inventario: [Data Validation Scenarios](https://github.com/muniter/e2e_testing_assignment/wiki/DV)

### Playwright Data

[Ejemplo en CI](https://github.com/muniter/e2e_testing_assignment/blob/main/.github/workflows/playwright.yml#L33)

Siga las instrucciones descritas para correr [playwright E2E](#playwright-e2e) **ignorando el paso 3**, y luego:

#### Correr las pruebas:

**NOTA**: este comando se encargará de crear/recrear el contenedor de ghost y su base de datos en cada ocasión que corra

```bash
npm run test-data
```

#### Tips

Si tiene problemas para instalar o correr playwright [dirígase a la guía de instalación](https://playwright.dev/docs/intro#installation)

También le puede servir verificar como las pruebas [automátizadas se definen en CI](https://github.com/muniter/e2e_testing_assignment/blob/main/.github/workflows/playwright.yml)

## Authors

- [Hector Tenazaca](https://github.com/htenezaca) (@htenezaca)
- [Javier León Ferro](https://github.com/andesjavierleon) (@andesjavierleon)
- [Javier López Grau](https://github.com/muniter) (@muniter)
