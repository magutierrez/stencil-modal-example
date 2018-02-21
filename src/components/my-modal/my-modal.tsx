import {Component, Prop, Element, Method, Event, EventEmitter, Listen, State} from '@stencil/core';

@Component({
    tag: 'my-modal',
    styleUrl: 'my-modal.scss'
})
export class MyModal {
    @Prop() title: string = '';
    @State() isOpen: boolean = false;

    @Element() element: HTMLElement;

    @Event() open: EventEmitter<boolean>;
    @Event() close: EventEmitter<boolean>;

    @Method() // Con este decorator, exponemos el método al DOM
    openModal(): void {
        // Emitimos un evento de modal abierto
        this.showModal(true);
        this.open.emit(true);
    }

    @Method()
    closeModal(): void {
        if (!this.isOpen) {
            this.showModal(false);
            // Emitimos un evento de modal cerrado
            this.close.emit(true);
        }
    }

    // Escuchamos el evento del teclado keydown y más especificamente la tecla de "Escape"
    @Listen('window:keydown.escape')
    handleEscapeKey(): void {
        this.closeModal();
    }

    // Ciclo de vida, el componente se ha cargado pero aún no se ha renderizado.
    // Sólo se llamará una vez.
    // Es buen sitio para hacer actualizaciones de último momento antes de que se renderice.
    componentWillLoad() {
        this.showModal(this.isOpen);
    }

    private showModal(show: boolean): void {
        this.isOpen = !show;
        this.element.classList.toggle('off', this.isOpen);
    }

    render() {
      return (
            <div>
                <h1>{this.title}</h1>

                {/*Aqui iria todo el contenido que introduzcamos dentro del componente*/}
                <slot />

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn-ok"
                    onClick={() => this.closeModal()}
                  >
                    Aceptar
                  </button>
                </div>

            </div>
        );
    }
}
