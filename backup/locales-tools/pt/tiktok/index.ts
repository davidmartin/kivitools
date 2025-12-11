import { tiktokAdCopyGenerator } from "./ad-copy-generator";
import { tiktokBioGenerator } from "./bio-generator";
import { caption_generator } from "./caption-generator";
import { coins_calculator } from "./coins-calculator";
import { tiktokContentCalendarGenerator } from "./content-calendar-generator";
import { engagement_calculator } from "./engagement-calculator";
import { hashtag_generator } from "./hashtag-generator";
import { hook_generator } from "./hook-generator";
import { money_calculator } from "./money-calculator";
import { mp3_downloader } from "./mp3-downloader";
import { profile_analytics } from "./profile-analytics";
import { profile_viewer } from "./profile-viewer";
import { script_writer } from "./script-writer";
import { shop_name_generator } from "./shop-name-generator";
import { tiktokSongRecommendations } from "./song-recommendations";
import { thumbnail_downloader } from "./thumbnail-downloader";
import { tiktokThumbnailTextGenerator } from "./thumbnail-text-generator";
import { transcript_generator } from "./transcript-generator";
import { username_checker } from "./username-checker";
import { username_generator } from "./username-generator";
import { video_downloader } from "./video-downloader";
import { video_ideas } from "./video-ideas";
import { voice_generator } from "./voice-generator";

export const tiktok = {
    ...tiktokAdCopyGenerator,
    ...tiktokBioGenerator,
    ...caption_generator,
    ...coins_calculator,
    ...tiktokContentCalendarGenerator,
    ...engagement_calculator,
    ...hashtag_generator,
    ...hook_generator,
    ...money_calculator,
    ...mp3_downloader,
    ...profile_analytics,
    ...profile_viewer,
    ...script_writer,
    ...shop_name_generator,
    ...tiktokSongRecommendations,
    ...thumbnail_downloader,
    ...tiktokThumbnailTextGenerator,
    ...transcript_generator,
    ...username_checker,
    ...username_generator,
    ...video_downloader,
    ...video_ideas,
    ...voice_generator,
};
