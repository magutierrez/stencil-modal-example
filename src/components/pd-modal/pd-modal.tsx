import { Component, Prop, Element, Method } from '@stencil/core';


@Component({
    tag: 'pd-modal',
    styleUrl: 'pd-modal.scss'
})
export class PdModal {
    @Prop() title: string;

    @Element() element: HTMLElement;

    @Method()
    openModal() {
        this.element.classList.remove('off');
    }

    @Method()
    closeModal() {
        this.element.classList.add('off');
    }

    render() {
        return (
            <div>
                <h1>{this.title}</h1>
                <slot></slot>
            </div>
        );
    }
}
