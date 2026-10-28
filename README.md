# B-Port System — Sitio Web

Landing page institucional y comercial de **B-Port System**, una solución de software para la gestión integral de operaciones portuarias: control de carga y estiba, administración de mano de obra tercerizada, seguridad laboral, facturación y contabilidad.

Sitio estático (HTML, CSS y JavaScript) pensado para presentar la propuesta de valor del producto, sus módulos, los roles de acceso y captar oportunidades comerciales mediante un formulario de contacto.

[![Demo](https://img.shields.io/badge/Demo-ver%20sitio-FF6500?style=flat-square)](https://nidtec.pol.una.py/bport)
[![Repo](https://img.shields.io/badge/GitHub-repositorio-0B192C?style=flat-square&logo=github)](https://github.com/rodrigobracho93/web_site_brachoportsystem)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## Demo

- **Sitio publicado:** https://nidtec.pol.una.py/bport
- **Repositorio:** https://github.com/rodrigobracho93/web_site_brachoportsystem

## ¿Qué es B-Port System?

B-Port System es una propuesta tecnológica para empresas que operan en terminales portuarias y necesitan un control más preciso sobre:

- la operación de carga, estiba y calado de barcazas;
- la gestión de personal, cuadrillas y traslados;
- la seguridad laboral, entrega de EPIs y cumplimiento;
- la facturación comercial y la contabilidad (libro diario);
- la trazabilidad operativa, la auditoría y los reportes.

Este repositorio contiene únicamente el **sitio web de presentación**. No incluye el sistema de gestión ni una base de datos: es una página estática cuyo formulario de contacto se envía por correo mediante [FormSubmit](https://formsubmit.co/).

## Secciones del sitio

| Sección | Ancla | Contenido |
| --- | --- | --- |
| Hero | — | Titular animado, propuesta de valor, llamadas a la acción y barco decorativo |
| El Desafío | `#problema` | Problemas operativos que resuelve el sistema (gobernanza de datos, seguridad, productividad, riesgos laborales, sincronización fiscal, transparencia) |
| Objetivos | `#objetivos` | Indicadores animados: experiencia, módulos, roles y trazabilidad |
| Módulos | `#modulos` | Núcleo operativo de carga, RRHH y seguridad, facturación automatizada y contabilidad |
| Matriz de Acceso | `#roles` | Permisos por perfil: superusuario, administrador, supervisor, cuadrilla, cliente y chofer |
| Contacto | `#contacto` | Formulario para agendar una presentación |

## Características

- **Diseño responsive** para móvil, tablet y escritorio.
- **Modo claro / oscuro** con preferencia guardada en `localStorage` y transición suave (View Transitions API cuando está disponible).
- **Menú móvil** tipo drawer con overlay y bloqueo del scroll.
- **Animaciones de entrada** al hacer scroll, efecto de máquina de escribir en el hero y contadores animados.
- **Navegación suave** entre secciones y botones con efecto magnético.
- **Botones flotantes** de WhatsApp y de volver arriba.
- **Formulario de contacto** con validación básica y envío AJAX a FormSubmit (nombre, empresa, correo y teléfono).
- **Identidad visual propia**: paleta azul marino/naranja, tipografías Barlow e Inter y favicon con el barco de la marca.

## Stack tecnológico

| Tecnología | Uso |
| --- | --- |
| HTML5 | Estructura semántica de una sola página |
| CSS3 | Estilos propios, animaciones y variables de marca (`assets/css/styles.css`) |
| JavaScript (ES6) | Interacciones, tema, menú, animaciones y formulario (`assets/js/script.js`) |
| Tailwind CSS | Utilidades de diseño; en desarrollo se carga por CDN y también puede compilarse con npm |
| Font Awesome 6 | Iconografía |
| Google Fonts | Tipografías Barlow e Inter |

No requiere frameworks de frontend ni backend.

## Estructura del proyecto

```text
.
├── index.html                  # Página completa (secciones, navbar, footer)
├── assets/
│   ├── css/
│   │   ├── input.css           # Punto de entrada de Tailwind
│   │   ├── styles.css          # Estilos personalizados y animaciones
│   │   └── tailwind.css        # Utilidades compiladas (generado por npm)
│   ├── images/
│   │   ├── favicon.svg         # Favicon alternativo (logo "B")
│   │   └── favicon-barco.svg   # Favicon actual: barco de la marca
│   └── js/
│       └── script.js           # Toda la lógica del sitio
├── package.json                # Scripts para compilar Tailwind
├── tailwind.config.js          # Colores de marca y rutas de contenido
├── postcss.config.js
├── README.md
└── .gitignore
```

## Cómo ejecutar el sitio

Al ser un sitio estático basta con abrir `index.html` en el navegador, aunque se recomienda servirlo por HTTP para que las rutas relativas y el formulario funcionen igual que en producción.

**Opción 1 — Python:**

```bash
python -m http.server 8000
```

**Opción 2 — XAMPP / Apache:**  
Copia la carpeta del proyecto dentro de `htdocs` y visita `http://localhost/<carpeta>`.

**Opción 3 — Node:**

```bash
npx serve .
```

## Compilar Tailwind (opcional)

El HTML ya carga Tailwind por CDN, así que **no es necesario compilar** para ver el sitio. Si quieres generar el CSS de producción:

```bash
npm install
npm run build:css     # genera assets/css/tailwind.css minificado
npm run watch:css     # recompila al guardar cambios
```

## Personalización rápida

- **Colores de marca:** `tailwind.config.js` (objeto `theme.extend.colors.brand`) y las variables CSS al inicio de `assets/css/styles.css`.
- **Textos y secciones:** `index.html`; cada bloque está comentado (`NAVBAR`, `HERO`, `PROBLEMA`, `MÓDULOS`, etc.).
- **Interacciones:** `assets/js/script.js`, organizado en bloques numerados (tema, menú, scroll, contadores, formulario).
- **Correo del formulario:** atributo `action` del formulario en la sección de contacto (`https://formsubmit.co/tu-correo`). La primera vez, FormSubmit envía un correo de confirmación.
- **Teléfono de WhatsApp:** enlaces `https://wa.me/595972424632` del botón flotante y del footer.

## Despliegue

El proyecto es 100 % estático, por lo que puede publicarse en cualquier hosting:

- **Apache / XAMPP / servidor institucional:** subir el contenido del repositorio (sin `node_modules`) por FTP o SFTP.
- **GitHub Pages:** *Settings → Pages → Deploy from a branch* y seleccionar `main` / carpeta raíz.
- **Netlify, Vercel o Cloudflare Pages:** conectar el repositorio; no requiere comando de build ni carpeta de salida especial.

La versión publicada actualmente está en https://nidtec.pol.una.py/bport.

## Autor y contacto

Proyecto desarrollado para presentación comercial e institucional.

- **Email:** rodrigo_bracho@fpuna.edu.py
- **WhatsApp:** +595 972 424632
- **GitHub:** [@rodrigobracho93](https://github.com/rodrigobracho93)

## Licencia

Este proyecto está bajo una licencia de uso interno y académico, según la política del autor o la institución responsable. No se autoriza su redistribución comercial sin consentimiento previo.
