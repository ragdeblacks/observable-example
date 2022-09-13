# observable-example
Ejemplo de como usar un observable y subscribirte para reaccionar en UI

El objetivo del ejemplo es validar la conexion de red del dispositivo con un plugin network
dicho plugin permite validar si se encuentra conectado el dispositivo o no
cabe mencionar que el plugin no es tan exacto al validar la conexion de inicio
por lo que aconsejo probar quitar la conexion de datos y wifi y volver a activarla para poder visualizar el cambio

EL ejemplo contiene un componente pagina llamado home, el cual contiene un boton con un icono 
el cual cambiara de acuerdo a los cambios que se detecten en la subscripcion. Dicha subscripcion se encuentra
en el typescript del componente home

Tambien se incluye una carpeta service donde se cuenta con un service llamado validate-connection.service el cual 
implementa el plugin de network y contiene el observable para detectar los cambios del plugin y un metodo observador 
al cual nos subscribiremos y detectar cambios.

Se incluye una dependencia subsink para gestionar subscripciones

Para usar uso de este repo debe contarse con una version de angular, ionic, native-run.

Contando con eso se pueden instalar las dependencias del proyecto y desplegar en dispositivo o generar apk

