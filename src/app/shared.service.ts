import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private email: string | null = null;
  private oldPasswords: Map<string, string> = new Map<string, string>();
  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string | null {
    return this.email;
  }
  setOldPassword(email: string, password: string) {
    this.oldPasswords.set(email, password);
  }

  getOldPassword(email: string): string | null {
    return this.oldPasswords.get(email) || null;
  }
}
