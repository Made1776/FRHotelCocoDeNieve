import { AlertType } from "../models/Enums/AlertType.enum";

export class AlertHandler {
  private static activeNotifications: {message: string; type: AlertType}[] = [];
  private static minTimeBetweenAlerts: number = 3500;

  static getActiveAlerts() {
    return this.activeNotifications;
  }

  static show(message: string, type: AlertType) {
    const newNotification = { message, type };
    this.activeNotifications.push(newNotification);

    if (this.activeNotifications.length === 1) {
      this.showNextNotification();
    }
  }

  private static showNextNotification() {
    const currentNotification = this.activeNotifications[0];

    setTimeout(() => {
      this.removeNotification(currentNotification);

      if (this.activeNotifications.length > 0) {
        this.showNextNotification();
      }
    }, this.minTimeBetweenAlerts);
  }

  private static removeNotification(notification: {message: string; type: AlertType}) {
    const index = this.activeNotifications.indexOf(notification);
    if (index !== -1) {
      this.activeNotifications.splice(index, 1);
    }
  }
}
