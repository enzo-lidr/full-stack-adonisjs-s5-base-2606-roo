## Contraste del prompt S04 con S05
- ¿Siguen teniendo sentido las historias tal como las generaste? ¿El alcance sigue ceñido al MVP del PRD, o se coló alguna que la IA "inventó" fuera de scope?
Las tareas siguen teniendo sentido tal como se generaron, el alcance sí está dentro de lo solicitado para el MVP, aunque sí se agregaron cosas "Inventadas", por ejemplo en la creación de cuentas en el PRD nunca se nombró que hacer si el usuario indicaba credenciales incorrectos, el sistema lo rechaza con mensaje, éste fue marcado como asumido, según se le solicitó.
Otro ejemplo es al cerrar la sesión, en el PRD solo se indica que se desea cerrar sesión pero no se dice que se hace o que pasa y el copiloto asumió; sin embargo, los puntos asumidos por el copiloto me parecen adecuados, cubren algunos vacios que no se indicaron en el PRD.

- ¿Hay historias cuyos criterios de aceptación ahora ves incompletos o poco verificables?
Sí, al hacer el poke-holes noté que aunque se infirió o se asumió muchas cosas, es claro que hace falta un análisis más detallado ya que los US tal como se nombran solo observan el happy-path.

- ¿Hay historias que han cambiado de naturaleza desde entonces? (porque descubriste una dependencia, porque la spec evolucionó, porque entiendes mejor el dominio).
Es posible ya que con los poke-holes se debe de mejorar la especificación o los AC de cada US para contemplar todos los posibles escenarios.

- ¿Hay historias nuevas que no aparecieron cuando lo generaste y que ahora sí deberían estar?
No, al revisar el PRD y comparar los US con los generados, el copiloto se mantuvo con lo solicitado.

- Al contrastar con el backlog que el mentor construyó en el directo de S4 sobre Linear: ¿qué priorizaste distinto tú? ¿Quién acertó y por qué?
Lo primero que vi distinto fue que ejecutó skills para ir creando y cargando los US en linear, eso fue muy bueno e interesante, práctico que ahorra tiempo, el tutor fue muy claro en decirnos que hay que tomar tiempo de horas para revisar bien todo detalladamente porque uno a primera vista ve los US y dice sí todo está aquí, todo pinta bonito, procesamos y es necesario evaluar y verificar que no se metan cosas que van más allá del alcance.
El tutor sacó el cerrar sesión del MVP, sin embargo yo lo dejaría pues es parte de lo solicitado en el PRD y él también vio que la conexión con google no es tan sencilla como se muestra en los US que se generaron, entonces priorizó en éste punto y lo dejo para luego hacer un refinamiento de esta tarea, yo no lo habia pensado y esto me parece muy atinado por parte del tutor.

## Ajustes al backlog
**Ajuste:** Cambiaría la funcionalidad de exportación a CSV
**Motivo:** Se está tratando de mejorar el que no tenga 2 herramientas desconectadas para llevar mis tareas, sin embargo al exportar a un CSV se queda corta la herramienta, pienso que lo mejor es llevar las tareas a un correo o al google drive donde la exportación no se pierda y se pueda retomar, hasta se pueden leer las tareas desde el movil como para recordarlas o chequearlas.
Otra cosa es que leer un archivo de comas(,) necesita de una herramienta extra para que sea leido con facilidad por un ser humano, y puede que las versiones de estas herramientas cambien complicando todo, es mejor una exportación a texto plano o a un archivo markdown (.md) donde hasta una IA puede leerlo con facilidad y hacer recomendaciones.

**Ajuste:** Cambiaría la US de conectar a una cuenta google a un Epic.
**Motivo:** La conexión a una cuenta google necesita de un conocimiento que si no se tiene hay que investigar, como dice el PRD hacer un spike, además se debe hacer pruebas para verificar que lo investigado sea fiable y que no tenga huecos de seguridad, en especial con la información que el usuario maneja con su cuenta google, que esta no se vea expuesta.
Entonces crear un spike para investigar y probar como conectar la cuenta google con FlowSync, otro spike para investigar y probar como se crean eventos en el calendario, probablemente hay una API de google, pero hay que aprender a utilizarla,
luego la US de crear la conexión del FlowSync con google Calendar, US de creación de eventos en Google Calendar, un US para actualización de eventos, un US para eliminar eventos. 
