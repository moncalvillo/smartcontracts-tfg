/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

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
    public Date: Date;

    @Property()
    public Owner: string;

    @Property()
    public State: Boolean;


}
