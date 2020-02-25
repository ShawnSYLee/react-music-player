import { songs } from './Songs';
const imagedir = '../assets/images/';

export const info = {
    name: 'Liked Songs',
    cover: imagedir + 'Flow.jpg',
    author: 'Shawn Lee'
};

export const tracks = [
    songs["shy_martin-good_together"],
    songs["reik-raptame"],
    songs["selena_gomez-hands_to_myself"],
    songs["post_malone-circles"],
    songs["anuel_aa-keii"],
    songs["galantis-we_can_get_high"],
    songs["elephante-glass_mansion"],
    songs["lauv-mean_it"],
    songs["shawn_mendes-lost_in_japan_remix"],
    songs["midnight_kids-run_it"]
];

export const playlists = {
    'liked-songs': {
        info: {
            name: 'Liked Songs',
            cover: imagedir + 'Flow.jpg',
            author: 'Shawn Lee'
        },
        tracks: [
            songs["shy_martin-good_together"],
            songs["reik-raptame"],
            songs["selena_gomez-hands_to_myself"],
            songs["post_malone-circles"],
            songs["anuel_aa-keii"],
            songs["galantis-we_can_get_high"],
            songs["elephante-glass_mansion"],
            songs["lauv-mean_it"],
            songs["shawn_mendes-lost_in_japan_remix"],
            songs["midnight_kids-run_it"]
        ]
    },
    'edm':{
        info: {
            name: 'EDM',
            cover: imagedir + 'House.jpg',
            author: 'Shawn Lee'
        },
        tracks: [
            songs["galantis-we_can_get_high"],
            songs["elephante-glass_mansion"],
            songs["shawn_mendes-lost_in_japan_remix"]
        ]
    }
};
