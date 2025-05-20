export interface Guest {
    id: string;
    name: string;
    type: 'guest';
}

export interface User {
    id: string;
    name: string;
    type: 'user';
}

export type Player = Guest | User; 