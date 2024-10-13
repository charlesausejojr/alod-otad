export type Match = {
    match_id: number;
    player_slot: number;
    radiant_win: boolean;
    duration: number;
    game_mode: number;
    lobby_type: number;
    hero_id: number;
    start_time: number;
    version: number | null;
    kills: number;
    deaths: number;
    assists: number;
    skill: number | null;
    average_rank: number | null;
    leaver_status: number;
    party_size: number | null;
    hero_variant: number | null;
};

export type Profile = {
    account_id: number;
    personaname: string;
    name: string;
    plus: boolean;
    cheese: number;
    steamid: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
    last_login: string; // Consider using Date if you parse it
    loccountrycode: string;
    is_contributor: boolean;
    is_subscriber: boolean;
};

export type WinLose = {
    win : number;
    lose : number;
}

export type PlayerData = {
    solo_competitive_rank: number;
    competitive_rank: number;
    rank_tier: number;
    leaderboard_rank: number;
    profile: Profile;
};

export type HeroStats = {
    hero_id: number;
    last_played: number; // Consider using Date if appropriate
    games: number;
    win: number;
    with_games: number;
    with_win: number;
    against_games: number;
    against_win: number;
};

export type PeerStats = {
    account_id: number;
    last_played: number; // Consider using Date if appropriate
    win: number;
    games: number;
    with_win: number;
    with_games: number;
    against_win: number;
    against_games: number;
    with_gpm_sum: number;
    with_xpm_sum: number;
    personaname: string;
    name: string;
    is_contributor: boolean;
    is_subscriber: boolean;
    last_login: string; // Consider using Date if you parse it
    avatar: string;
    avatarfull: string;
};
