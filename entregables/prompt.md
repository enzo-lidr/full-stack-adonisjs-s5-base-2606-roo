Crea en el directorio ./docs/ un archivo llamado Arquitectura.md.
Lee la estructura del directorio ./backend/app/ y los archivos de rutas en ./backend/start/routes.ts.
Genera un diagrama Mermaid que muestre:
1. Las entidades principales (modelos Lucid en app/models/)
2. Las relaciones entre ellas
3. Los grupos de endpoints REST disponibles
Embede en el archivo Arquitectura.md el resultado de la generación de diagramas.
Usa graph LR. Embede directamente en el archivo Arquitectura.md al final del archivo.

Usa graph TB. Toma desde la carpeta raíz del proyecto y embede directamente en el archivo README.md al final del archivo el grafico generado y bajo la etiqueta ##Estructura del proyecto

1. Lee app/models/*.ts
2. Genera diagrama de entidades Mermaid (ERD o graph)
3. Embede en /docs/Arquitectura.md al final del archivo, agrega Etiqueta "##Diagrama Entidad Relacion" y luego de esto inserta el diagrama generado.
4. Genera diagrama de secuencia del flujo de auth (Mermaid)
5. Coloca en docs/auth-flow.md

 Genera para el sistema completo un diagrama C4 para visualizar en Structurizr