[Card Component] Error duplicidad elementos
###########################################

:estimark:
  state=closed

Al crear copias del componente Card el sistema duplica los elementos hijos.

CRITERIOS DE VALIDACIÓN
=======================

Criterio 1
----------

* **Dado:** Que el usuario cree una nueva copia de la carta
* **Cuando:** El sistema renderice el componente
* **Entonces:** El sistema debe identitificar los elementos por defecto de los
  personalizados
