import { Injectable } from '@angular/core';
import { Client } from './client';

@Injectable()
export class ClientService{
	insertClient(client: Client): void {
		console.log("Account created");
	}

}

