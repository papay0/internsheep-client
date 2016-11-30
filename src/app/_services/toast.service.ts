import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class ToastService {
    autoHide: number = 0;

    show(message: string): void {
        let config = new MdSnackBarConfig();
        // let config = new MdSnackBarConfig(viewContainerRef);
        this.snackBar.open(message, 'DISMISS', config);
    }

    displayToast(message: string, ms: number = 3000) {
        let x = document.getElementById('snackbar');
        x.innerHTML = message;
        x.className = 'show';
        setTimeout(() => { x.className = x.className.replace('show', ''); }, ms);
    }

    constructor(
        private snackBar: MdSnackBar
    ) {}
}