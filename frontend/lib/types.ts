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

export type FilteredMatch = {
    match_id: number;
    player_slot: number;
    radiant_win: boolean;
    duration: number;
    game_mode: number;
    lobby_type: number;
    hero_id: number;
    hero_name: string,
    kills: number;
    deaths: number;
    assists: number;
    skill: number | null;
    src: string,
    average_rank: number | null;
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

export type TopHero = {
    name: string;
    percentage: number;
    src: string;
};

export type HeroStats = {
    id: number;
    name: string;
    localized_name: string;
    primary_attr: string;
    attack_type: string;
    roles: string[];
    img: string;
    icon: string;
    base_health: number;
    base_health_regen: number;
    base_mana: number;
    base_mana_regen: number;
    base_armor: number;
    base_mr: number;
    base_attack_min: number;
    base_attack_max: number;
    base_str: number;
    base_agi: number;
    base_int: number;
    str_gain: number;
    agi_gain: number;
    int_gain: number;
    attack_range: number;
    projectile_speed: number;
    attack_rate: number;
    base_attack_time: number;
    attack_point: number;
    move_speed: number;
    turn_rate: number;
    cm_enabled: boolean;
    legs: number;
    day_vision: number;
    night_vision: number;
    hero_id: number;
    turbo_picks: number;
    turbo_wins: number;
    pro_ban: number;
    pro_win: number;
    pro_pick: number;
    "1_pick": number;
    "1_win": number;
    "2_pick": number;
    "2_win": number;
    "3_pick": number;
    "3_win": number;
    "4_pick": number;
    "4_win": number;
    "5_pick": number;
    "5_win": number;
    "6_pick": number;
    "6_win": number;
    "7_pick": number;
    "7_win": number;
    "8_pick": number;
    "8_win": number;
};

export type Hero = {
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

export type Peer = {
    steamId: number;
    name: string;
    wins: number;
    losses: number;
    winRate? : number;
    img? : string;
}