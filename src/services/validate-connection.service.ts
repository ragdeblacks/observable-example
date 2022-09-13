import { Injectable } from '@angular/core';
// plugin para validar la coneccion del dispositivo
import { Network } from '@ionic-native/network/ngx';
// import para validar la plataforma donde se esta ejecutando
import { Platform } from '@ionic/angular';
// import para manejar observables
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ValidateConectionService{
    // aqui el observable, hay dos tipos los subject que son sin un
    // parametro inicial y los BehaviorSubject que van con un dato inicial
    // en este ejemplo una variable booleana (puedes usarlo para cualquier tipo de variable)
    // recomendacion: trata de usar un dato inicial para que sea punto de partida
    // la aplicacion debe cubrir happypat como escenarios negativos
    private hasConnection = new BehaviorSubject(false);
    constructor(
        private network: Network,
        private platform: Platform
    ){
        this.testNetworkConnection();
    }

    testNetworkConnection(){
        if (this.platform.is('cordova')) {
            // este es en telefono
            // valido si el telefono tiene wifi con este metodo
            // se realiza una subscripcion para que se quede
            // a observar algun cambio que se origine en el dispositivo
            // en cuanto a la coneccion se refiere
            this.network.onConnect().subscribe(() => {
                console.log('network was connected :-)');
                // este metodo next es para notificar un cambio al observable que declaramos
                this.hasConnection.next(true);
                return;
            });
            // en caso de detectar que no se tiene conexion
            // mismo caso se subscribe para escuchar cambios
            this.network.onDisconnect().subscribe(() => {
                // este metodo next es para notificar un cambio al observable que declaramos
                console.log('network was disconnected :-(');
                this.hasConnection.next(false);
                return;
            });
        }
    }

    // todo queda dentro del constructor para que cuando se inicialize el service se valide la conexion

    // importanticimo que un observable tenga un
    // metodo de observacion a travez del cual podras
    // subscribirte y escuchar los cambios que se
    // le realicen al observable
    // recomendacion: la variable observable siempre va privada
    // de esta manera garantizas que nadie pueda escuchar los cambios
    // mas que el metodo donde esta anclado
    //nota: el metodo en si es un observable
    public getNetworkStatus(): Observable<boolean> {
        // dentro se define la variable observable
        // especificando que es un observable
        return this.hasConnection.asObservable();
    }
}
