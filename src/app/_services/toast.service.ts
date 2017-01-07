import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class ToastService {
    autoHide: number = 0;

    show(message: string): void {
        let config = new MdSnackBarConfig();
        config.duration = 2 * 1000;
        this.snackBar.open(message, 'OK', config);
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