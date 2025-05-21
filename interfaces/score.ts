// Even though this folder is called "interfaces", this file uses a type because a union is required.

export interface ScoreSheetDTO {
    game_id: number;
    sections: SectionDTO[];
}

export interface SectionDTO {
    name: string;
    scores: ScoreDTO[];
}

/**
 * ScoreDTO: either user_id or guest_id is required, but not both.
 */
export type ScoreDTO =
    | { user_id: string; guest_id?: undefined; score: number }
    | { guest_id: string; user_id?: undefined; score: number };

export interface ScoreSheet {
    id: number;
    game_id: number;
    created_at: string;
    updated_at: string;
    game: {
        id: number;
        name: string;
    };
    sections: ScoreSection[];
}

export interface ScoreSection {
    id: number;
    score_sheet_id: number;
    guest_id: number | null;
    user_id: number | null;
    score: number;
    created_at: string;
    updated_at: string;
    name: string;
    guest: {
        id: number;
        name: string;
    } | null;
    user: {
        id: number;
        name: string;
    } | null;
}

export interface ScoreDetailResponse {

    id: number;
    game_id: number;
    created_at: string;
    updated_at: string;
    game: {
        id: number;
        name: string;
        img_path: string;
    };
    sections: {
        id: number;
        score_sheet_id: number;
        guest_id: number | null;
        user_id: number | null;
        score: number;
        created_at: string;
        updated_at: string;
        name: string;
        guest: {
            id: number;
            name: string;
        } | null;
        user: {
            id: number;
            name: string;
        } | null;
    }[];
}

export interface SectionScore {
    id: string;
    score_sheet_id: string;
    guest_id: string | null;
    user_id: string | null;
    score: string;
    name: string;
    guest: { id: string; name: string } | null;
    user: { id: string; name: string } | null;
}

