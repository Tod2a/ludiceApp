export interface Category {
    id: number;
    name: string;
}

export interface Publisher {
    id: number;
    name: string;
}

export interface Creator {
    id: number;
    firstname: string;
    lastname: string;
}

export interface Mechanic {
    id: number;
    name: string;
}

export interface Game {
    id: number;
    name: string;
    description: string;
    published_at: string;
    img_path: string;
    min_players: number;
    max_players: number;
    average_duration: number;
    EAN: string | null;
    suggestedage: number;
    is_expansion: boolean;
    categories: Category[];
    publishers: Publisher[];
    creators: Creator[];
    mechanics: Mechanic[];
}

export interface GameDetail {
    id: number;
    name: string;
    description: string;
    published_at: string;
    img_path: string;
    min_players: number;
    max_players: number;
    average_duration: number;
    EAN: string | null;
    suggestedage: number;
    in_library: boolean;
    is_expansion: boolean;
    categories: Category[];
    publishers: Publisher[];
    creators: Creator[];
    mechanics: Mechanic[];
}

export interface GameResponse {
    game: Game;
    message: string;
}