/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

export interface User {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  wallet?: string;
  roleType?: string;
  name?: string;
}

@Object()
export class Expense {

    @Property()
    public ID: string;

    @Property()
    public Amount: number;

    @Property()
    public Concept: string;

    @Property()
    public Type: string;

    @Property()
    public Currency: string;
    
    @Property()
    public Project: string;

    @Property()
    public Owner: User;

    @Property()
    public State: string;

    @Property()
    public Resolution: string | null;

    @Property()
    public Inspector: User | null;


    @Property()
    public createdAt: Date;
    @Property()
    public resolvedAt: Date | null;
    @Property()
    public updatedAt: Date | null;


}
