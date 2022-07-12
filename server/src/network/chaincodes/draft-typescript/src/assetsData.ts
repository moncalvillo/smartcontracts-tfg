import { Expense } from './asset';













const assets: Expense[] = [
        {
            ID: 'aaa9f4bc-0fa1-454f-ba1f-fa313a4198f8',
            Amount: 100,
            Concept: "Material for project 1",
            Type: "Material",
            Project: "Project 1",
            Owner: "userTest",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: true,
        },
        {
            ID: 'dda875a3-6f47-4dcc-81fb-10563370a437',
            Amount: 200,
            Concept: "Material for project 1",
            Type: "Material",
            Project: "Project 1",
            Owner: "userTest",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: false,
        },
        {
            ID: '15501c28-d518-4696-839e-091f65ffeea8',
            Amount: 300,
            Concept: "Equipment for project 1",
            Type: "Equipment",
            Project: "Project 1",
            Owner: "secondUser",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: true,
        },
        {
            ID: 'cd9aebf0-8efd-40ca-9097-d31294ea339e',
            Amount: 400,
            Concept: "Material for project 2",
            Type: "Equipment",
            Project: "Project 2",
            Owner: "userTest",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: false,
        },
        {
            ID: '1ab592a8-75b3-4ae8-a7a0-bff7f8944348',
            Amount: 500,
            Concept: "Material for project 2",
            Type: "Material",
            Project: "Project 2",
            Owner: "userTest",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: true,
        },
        {
            ID: 'dec4ad95-fa7e-44cb-b4da-3265858817a4',
            Amount: 600,
            Concept: "Equipment for project 2",
            Type: "Equipment",
            Project: "Project 2",
            Owner: "secondUser",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: false,
        },
        {
            ID: 'bffd138d-c96d-4ab3-a4d6-09b6024f7aac',
            Amount: 700,
            Concept: "Material for project 3",
            Type: "Material",
            Project: "Project 3",
            Owner: "userTest",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: true,
        },
        {
            ID: 'cee61d5a-36e1-408b-8ba7-10af32d64b32',
            Amount: 800,
            Concept: "Material for project 3",
            Type: "Material",
            Project: "Project 3",
            Owner: "userTest",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: false,
        },
        {
            ID: '07ea0d55-6775-4561-b8cd-21e56c3807c3',
            Amount: 900,
            Concept: "Equipment for project 3",
            Type: "Equipment",
            Project: "Project 3",
            Owner: "secondUser",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: true,
        },
        {
            ID: '4e2cb045-9541-4808-b8aa-9d4dd00f738a',
            Amount: 1000,
            Concept: "Material for project 4",
            Type: "Material",
            Project: "Project 4",
            Owner: "userTest",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: false,
        },
        {
            ID: 'f0e10219-27c1-42e0-9417-69dc2f3a4878',
            Amount: 1100,
            Concept: "Material for project 4",
            Type: "Material",
            Project: "Project 4",
            Owner: "userTest",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: true,
        },
        {
            ID: 'b4b2351f-61e4-43fb-ad24-af3a2ffd9eb2',
            Amount: 1200,
            Concept: "Equipment for project 4",
            Type: "Equipment",
            Project: "Project 4",
            Owner: "secondUser",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: false,
        },
        {
            ID: 'cj52551f-61e4-a3fb-adc4-af3a2ff45at4',
            Amount: 1300,
            Concept: "Material for project 5",
            Type: "Material",
            Project: "Project 5",
            Owner: "userTest",
            Currency: "USD",
            Date: new Date(2022, 6, 20, 15,0,0),
            State: false,
        },
    ];

export const ASSETS_LIST = assets;
export const ASSETS_LIST_ID = assets.map(asset => asset.ID);
export const ASSETS_LIST_AMOUNT = assets.map(asset => asset.Amount);
export const ASSETS_LIST_CONCEPT = assets.map(asset => asset.Concept);
export const ASSETS_LIST_TYPE = assets.map(asset => asset.Type);
export const ASSETS_LIST_PROJECT = assets.map(asset => asset.Project);
export const ASSETS_LIST_OWNER = assets.map(asset => asset.Owner);
export const ASSETS_LIST_CURRENCY = assets.map(asset => asset.Currency);
export const ASSETS_LIST_DATE = assets.map(asset => asset.Date);
export const ASSETS_LIST_STATE = assets.map(asset => asset.State);
export const ASSETS_LIST_ALL = assets;
export const ASSETS_LIST_ALL_ID = assets.map(asset => asset.ID);
export const ASSETS_LIST_ALL_AMOUNT = assets.map(asset => asset.Amount);
export const ASSETS_LIST_ALL_CONCEPT = assets.map(asset => asset.Concept);
export const ASSETS_LIST_ALL_TYPE = assets.map(asset => asset.Type);
export const ASSETS_LIST_ALL_PROJECT = assets.map(asset => asset.Project);
export const ASSETS_LIST_ALL_OWNER = assets.map(asset => asset.Owner);
