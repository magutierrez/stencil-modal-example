import {Component, Prop, Element, Method, Event, EventEmitter, Listen} from '@stencil/core';

@Component({
    tag: 'my-modal',
    styleUrl: 'my-modal.scss'
})
export class MyModal {
    @Prop() title: string = '';

    @Element() element: HTMLElement;

    @Event() open: EventEmitter<boolean>;
    @Event() close: EventEmitter<boolean>;

    @Method()
    openModal(): void {
        this.element.classList.remove('off');
        // Emitimos un evento de modal abierto
        this.open.emit(true);
    }

    @Method()
    closeModal(): void {
      if (!this.element.classList.contains('off')) {
        this.element.classList.add('off');
        // Emitimos un evento de modal cerrado
        this.close.emit(true);
      }
    }

    @Listen('window:keydown.escape')
    handleEscapeKey(){
      this.closeModal();
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
                    class="btn-accept"
                    onClick={() => this.closeModal()}
                  >
                    Aceptar
                  </button>
                </div>
            </div>
        );
    }
}
