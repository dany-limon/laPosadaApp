import * as types from '../ActionTypes'

const STATUTES = [{
  header: '13/06/2015',
  title:'Reunión Peña LaPosada',
  text:'<p>A fecha 13 de Junio de 2015 a las 20:00 horas se reunen en primera convocatoria los sigientes socios de la peña La Posada:<br>- <i>Pablo Benito</i><br>- <i>Manuel Domingo</i><br>- <i>Aritz Del Álamo</i><br>- <i>Javier Palacios</i><br>- <i>Mario Arandilla</i><br>- <i>Daniel Almería</i><br>- <i>Jaime Rodrigo</i><br>- <i>Jorge Izcara</i><br>- <i>Sergio Domingo</i></p><p>El motivo de la reunión es aprobar los diferentes puntos de la convocatoria adjunta en Anexo I.</p><br><p>1. Puntos 1 y 2 de la convocatoria, aprobación y explicación de las cuentas<br><b>Todos conforme</b></p><br><p>2. Acuerdos que deban llevavarse a cabo para la ... del dinero.<br>- Se han asignado las tareas en el cuaderno de Carlos.</p><br><p>3. Poner falsas vigas:<br>- <i>Votos a favor: 1</i><br>- <i>Votos en contra: 5</i><br>- <i>Abstenciones: 3</i><br><b>No se aprueba</b></p><br><p>4. Mosquiteras:<br>- <i>Votos a favor: 9</i><br>- <i>Votos en contra: 0</i><br>- <i>Abstenciones: 0</i><br><b>Se aprueba</b></p><p>5. Herramientas (Azadilla, carretilla, pala):<br>- <i>Votos a favor: 9</i><br>- <i>Votos en contra: 0</i><br>- <i>Abstenciones: 0</i><br><b>Se aprueba</b></p><p>6. Cuota de este año 2015. Se proponen 300€:<br>- <i>Votos a favor: 9</i><br>- <i>Votos en contra: 0</i><br>- <i>Abstenciones: 0</i><br><b>Se aprueba</b><br><br><code>El ingreso se ha de realizar como máximo el 10 de Julio.</code> <br><br>En vistas a Enero se aprueba otra cuota de la misma cantidad.</p><br><p>Se da por finalizada la reunión a las 22:40 horas.</p><p>Firman los presentes.</p>'
},{
  header: '26/12/2015',
  title:'Reunión Peña LaPosada',
  text:'<p>A fecha 26 de Diciembre de 2015 a la 19:00 horas se reunen los siguientes miembros de la peña para aclarar las cuentas de la peña.</p><p>Se reunen los siguiente socios:<br>- <i>Pablo Benito</i><br>- <i>Sergio Domingo</i><br>- <i>Jorge Izcara</i><br>- <i>Hector Almería</i><br>- <i>Aritz Marcos</i><br>- <i>Jaime Rodrigo</i><br>- <i>Carlos Izcara</i><br>- <i>Mario Arandilla</i><br>- <i>Javier Domingo</i></p><p>Reunidas 9 personas, hay quorum para realizar las mismas.</p><br><p>1. Presentación de cuentas de 2015 por La Junta<br>Se debe a:<br>- <i>Pablo 25€</i><br>- <i>Carlos 23€</i><br>- <i>Javier Palacios 33€</i><br>- <i>Manuel 5€</i><br><br>Se acuerda lo primero liquidar estas cuentas. <b>Se aprueban las cuentas por unanimidad.</b></p><br><p>2. Necesidades para el 2016:<br>- Se habla de las necesidades.</p><br><p>3. Cuota para este año 2016 50€.<br>Derrama para este año 2016 100€.<br><br>La condición de la derrama es que si se hace la leñera se aprueba automáticamente una derrama para hacerla.<b> Se aprueba por unanimidad.</b></p><br><p>4. Bar de la posada.<br><b>Se aprueba montar un bar</b>. Dos encargados: Manuel Domingo y Carlos Izcara.</p><br><p>5. <code>La cuota se pagará has el 31 de Enero del 2016.</code></p><br><p>Se da por finalizada la reunión.</p><p>Firman los presentes.</p>'
},{
  header: '12/06/2016',
  title:'Reunión Peña LaPosada',
  text:'<p>A fecha de 12/06/2016 a las 18:30 horas se reunen los sigientes miembros para aclarar los sientes puntos del día:<br>- <i>Pablo Benito</i><br>- <i>Sergio Domingo</i><br>- <i>Javier Domingo</i>- <i>Manuel Domingo</i><br>- <i>Jorge Izcara</i><br>- <i>Carlos Martínez</i><br>- <i>Jaime Rodrigo</i><br>- <i>Javier Palacios</i><br>- <i>Aritz Marcos Del Álamo</i><br>- <i>Javier Ruiz</i><br><br>Reunidas las 10 personas hay quorum para iniciar la reunión.</p><p>1. Renovación de La Junta de La Peña. Se proponen los siguientes miembros para La Junta:<br>+ Presidente: Pablo Benito Martinez<br>+ Vicepresidente: Sergio Domnguez Sanz<br>+ Secretario y tesorero: Manuel Domingo Ontoso<br>- <i>Votos a favor: 10</i><br>- <i>Votos en contra: 0</i><br><br><b>Se aprueba por mayoría absoluta la renovación de La Junta.</b></p><br><p>2. Autorización para sacar dinero de la cuenta de La Peña a los miembros de La Junta General (Presidente y Tesorero) mediante firma única, actualizandoa los nuevos miembros en la cuenta <b>ES40 3060 0002 1222 3634 3519</b><br>- <i>Votos a favor: 10</i><br>- <i>Votos en contra: 0</i><br><br><b>Se aprueba por mayoría absoluta este punto del orden del día.</b></p><br><p>A las 19:00 se da por finalizada la reunión firmando los presentes.</p>'
},{
  header: '26/12/2016',
  title:'Reunión Peña LaPosada',
  text:'<p>A día 12/12/2016 a las 18:00 horas se reunen los sigientes miembros de la peña para aclarar los diferentes puntos del día:<br>- <i>Pablo Benito</i><br>- <i>Jaime Rodrigo</i><br>- <i>Javier Palacios</i><br>- <i>Jorge Izcara</i><br>- <i>Mario Sánchez</i><br>- <i>Manuel Domingo</i><br>- <i>Sergio Domingo</i><br>- <i>Aritz Marcos</i></p><p>1. Aprobación de la cuota y derrama para el 2017. <br><br> <b>Se aprueba por mayoría absoluta.</b> 100€ de derrama y 50€ de cuota del año 2017 <code>(Antes del 31/01/2017)</code>.<br><br>- <i>Votos a favor: 9</i><br>- <i>Votos en contra: 0</i></p><br><p>2. Votación sobre la entrada de nuevo socio en la Peña: <br>- <i>Votos a favor: 3</i><br>- <i>Votos en contra: 4</i><br>- <i>Abstenciones: 2</i><br><br><b>No se aprueba la entrada de un nuevo socio, en este momento.</b></p><br><p>3. Presentación de las cuentas de 2016. <br><br><b>Se aprueban por unanimidad.</b></p><br><p>4. Acondicionamiento y mejoras del merendero.</p><br><p>Se acaba la reunión a las 18:50 con la firma del acta por todos los miembros.</p>'
}]

const initialState = {
  items:STATUTES,
};

export default function meetingsState(state = initialState, action = {}) {
  switch (action.type) {

    default:
      return state
  }
}
