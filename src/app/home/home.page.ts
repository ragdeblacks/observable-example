import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ValidateConectionService } from 'src/services/validate-connection.service';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
// implementamos dos metodos del ciclo de vida de angular
export class HomePage implements OnInit, OnDestroy {
  // variable para usar el two way-building
  // cambiando algo en la interfaz
  isConnected: boolean;
  // dependencia para poder arministrar las subscripciones
  // da la posubilidad de matar subscripciones
  subs: SubSink = new SubSink();
  constructor(
    // dependencia para detectar cambios en ejecucion y actualizar la UI
    private changeDetector: ChangeDetectorRef,
    private validateNet: ValidateConectionService
  ) { }
  // este metodo forma parte del ciclo de vida de angular
  // cuando se abre este componente Page se ejecuta inicialmente
  ngOnInit() {
    // recordar que existen dos formas de observar cambios
    // una promesa (se ejecuta una sola vez)
    // una subscripcion (escuchara cualquier cambio y reaccionara a dichos cambios)
    // En caso de subscripcion no olvidar matar la subscripcion
    // si es que solo se usara en determinado componente

    // aca llamamos el metodo donde se anclo el observalble
    // el metodo en si tambien es un observable por lo cual
    // reporta cualquier cambio que se ejecute dentro del mismo
    this.subs.sink = this.validateNet.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
      // metodo que detecta cambios en variables
      // integradas en la UI
      this.changeDetector.detectChanges();
      if (!this.isConnected) {
        console.log('Por favor enciende tu conexión a Internet');
      } else{
        console.log('Conectado');
      }
    });
  }
  // metodo de ciclo de vida de ionic
  // se ejecuta al salir del componente
  ngOnDestroy() {
    // elimina las subscripciones vivas
    this.subs.unsubscribe();
  }

}
