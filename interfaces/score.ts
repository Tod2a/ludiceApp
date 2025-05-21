// Even though this folder is called "interfaces", this file uses a type because a union is required.

export interface ScoreSheetDTO {
    gameId: number;
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
    | { user_id: number; guest_id?: undefined; score: number }
    | { guest_id: number; user_id?: undefined; score: number };