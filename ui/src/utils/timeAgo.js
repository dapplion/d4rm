import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo();

export default timestamp => {
  const ago = timeAgo.format(timestamp, "twitter");
  if (!ago) return "Just now";
  if (ago.includes(" ")) return ago;
  else return `${ago} ago`;
};
