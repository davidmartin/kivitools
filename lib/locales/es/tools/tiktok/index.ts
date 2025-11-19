import { script_writer } from "./script-writer";
import { username_generator } from "./username-generator";
import { profile_analytics } from "./profile-analytics";
import { voice_generator } from "./voice-generator";
import { video_downloader } from "./video-downloader";
import { profile_viewer } from "./profile-viewer";
import { video_ideas } from "./video-ideas";
import { hook_generator } from "./hook-generator";
import { coins_calculator } from "./coins-calculator";
import { transcript_generator } from "./transcript-generator";
import { hashtag_generator } from "./hashtag-generator";
import { shop_name_generator } from "./shop-name-generator";
import { thumbnail_downloader } from "./thumbnail-downloader";
import { engagement_calculator } from "./engagement-calculator";
import { mp3_downloader } from "./mp3-downloader";
import { money_calculator } from "./money-calculator";
import { username_checker } from "./username-checker";

export const tiktok = {
  ...script_writer,
  ...username_generator,
  ...profile_analytics,
  ...voice_generator,
  ...video_downloader,
  ...profile_viewer,
  ...video_ideas,
  ...hook_generator,
  ...coins_calculator,
  ...transcript_generator,
  ...hashtag_generator,
  ...shop_name_generator,
  ...thumbnail_downloader,
  ...engagement_calculator,
  ...mp3_downloader,
  ...money_calculator,
  ...username_checker,
};