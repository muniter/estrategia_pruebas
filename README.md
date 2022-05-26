# Ejecución estrategia de pruebas

> This repository is an educational assignment.

- Aplicación bajo pruebas: [Ghost](https://github.com/TryGhost/Ghost)
- Versión: 4.41.1
- Versión a comparar VRT: 4.36

## Quick Links:

Estrategia:

- [Estrategia de Pruebas](https://docs.google.com/document/d/1uYQX9biop16W96_n8FHOHEGumP9cW_qx1ooGHgaSzn0/export?format=pdf)
- [Inventario de pruebas manuales exploratorias](https://docs.google.com/spreadsheets/u/0/d/1TR15trADeCwL9MpPPKpiI_Uum6LLXTJB478EpZiyrg0/export?format=pdf)

Resultados:
- [Inventario de pruebas general](https://github.com/muniter/estrategia_pruebas/blob/master/doc/inventario.md)
- [Instrucciones y descripción de pruebas manuales](https://github.com/muniter/estrategia_pruebas/blob/master/doc/pruebas_manuales.md)

Reportes:
- [Reporte VRT](https://muniter.github.io/estrategia_pruebas/playwright.html)
- [Informe Resultados Semana 1](https://github.com/muniter/estrategia_pruebas/blob/master/doc/semana1.md)

Instrucciones de ejecución:
- [E2E Testing](#e2e-testing)
- [VRT Testing](#visual-regression-testing)

# Instrucciones

Los archivos de pruebas se encuentran en [e2e-playwright/](https://github.com/muniter/estrategia_pruebas/tree/master/e2e-playwright/tests)

La herramienta está corriendo en **Continuous Integration** en este repositorio, puede [navegar a actions](https://github.com/muniter/estrategia_pruebas/actions) para ver los últimos resultados de los test, o puede ver el [listado de commits](https://github.com/muniter/estrategia_pruebas/commits/master) para ver su estado final.

Los workflows, o definición de procedimientos están definidos de la siguiente manera:

1. [Tests](https://github.com/muniter/estrategia_pruebas/blob/master/.github/workflows/test.yml)

Estos corren con cada commit a master en el repositorio.

## E2E Testing

Instrucciones para correr pruebas E2E.

[Ejemplo en CI](https://github.com/muniter/estrategia_pruebas/blob/master/.github/workflows/test.yml#L15)

Instrucciones para instalar en máquina en Unix like systems (Linux, Mac OS (**no probado**)).

#### 1. Instalar dependencias

```bash
npm install
```

#### 2. Instalar dependencias nivel de sistema

- Chromium
- Docker

Instalar playwright browsers:

```bash
npx playwright install
```

Si tiene problemas para instalar siga [la guía oficial de instalación de playwright](https://playwright.dev/docs/intro#installation)

#### 3. Correr las pruebas:

**NOTA**: El [global setup](https://github.com/muniter/estrategia_pruebas/blob/master/global-setup.ts) de playwright se encargará de levantar una instancia de Ghost usando un contenedor en el puerto 9333. por lo cual solo el siguiente llamado es suficiente para hacer el bootstrap.

```bash
npm run e2e
```

**NOTA: este comando se encargará de recrear el contenedor de ghost y su base de datos en cada ocasión que corra**

#### Tips

Si tiene problemas para instalar o correr playwright [dirígase a la guía de instalación](https://playwright.dev/docs/intro#installation)

También le puede servir verificar como las pruebas [automátizadas se definen en CI](https://github.com/muniter/estrategia_pruebas/blob/master/.github/workflows/test.yml)

---
## Visual Regression Testing

Instrucciones para correr pruebas de VRT en playwright.

Actualmente las pruebas de VRT se corren en cada commit de este repositorio, como se puede ver en el siguiente workflow:

- [VRT](https://github.com/muniter/estrategia_pruebas/blob/master/.github/workflows/test.yml#L35)

Los resultados son publicados automáticamente a la rama [gh-pages](https://github.com/muniter/estrategia_pruebas/tree/gh-pages) de este repositorio y por lo tanto se sirve como contenido web en los siguientes links:

- [VRT results](https://muniter.github.io/estrategia_pruebas/playwright.html)

Para correr las pruebas en modos VRT se hace necesario lo siguiente:

---
### Instrucciones VRT

Siga las instrucciones descritas para correr [E2E Testing](#e2e-testing) **ignorando el paso 3**, y luego:

#### 1. Run the test suite in both Ghost versions

```bash
GHOST_VRT=1 GHOST_VERSION=4.41.1 npm run e2e
GHOST_VRT=1 GHOST_VERSION=4.36 npm run e2e
```

#### 2. Artifacts processing and report generation

Para generar el reporte:

```bash
npm run reporter -- --prev 4.36 --post 4.41.1
```

Esto generará un archivo en la base del repositorio [`playwright.html`](https://muniter.github.io/estrategia_pruebas/playwright.html) este es el reporte VRT.

---

## Autores

- [Hector Tenazaca](https://github.com/htenezaca) (@htenezaca)
- [Javier León Ferro](https://github.com/andesjavierleon) (@andesjavierleon)
- [Javier López Grau](https://github.com/muniter) (@muniter)
