import { Component } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: false,
})
export class ScannerPage {
  scanning: boolean = false;

  constructor(private alertController: AlertController) {}

  async startScanner() {
    const allowed = await this.checkPermission();
    if (!allowed) {
      this.showErrorMessage('Permiso de cámara denegado.');
      return;
    }

    const body = document.querySelector('body');
    this.scanning = true;

    try {
      if (body) {
        body.classList.add('scanner-active');
      }

      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan({
        targetedFormats: [SupportedFormat.QR_CODE],
      });

      if (result.hasContent) {
        console.log('Contenido escaneado:', result.content);
        this.showSuccessMessage(`Contenido escaneado: ${result.content}`);
      } else {
        this.showErrorMessage('No se detectó contenido en el QR.');
      }
    } catch (error) {
      console.error('Error durante el escaneo:', error);
      this.showErrorMessage('Ocurrió un error durante el escaneo.');
    } finally {
      if (body) {
        body.classList.remove('scanner-active');
      }
      this.scanning = false;
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    }
  }

  async checkPermission(): Promise<boolean> {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      return true;
    } else if (status.denied) {
      const alert = await this.alertController.create({
        header: 'Permiso requerido',
        message: 'Por favor, habilita el acceso a la cámara en la configuración.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Abrir Configuración',
            handler: () => {
              BarcodeScanner.openAppSettings();
            },
          },
        ],
      });
      await alert.present();
      return false;
    }
    return false;
  }

  async showSuccessMessage(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showErrorMessage(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}