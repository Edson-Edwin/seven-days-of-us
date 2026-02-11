export const PASSWORD = "51125";

export interface DayConfig {
  day: number;
  date: string; // "MM-DD"
  title: string;
  subtitle: string;
  emoji: string;
  route: string;
  color: string;
}

export const DAYS: DayConfig[] = [
  { day: 1, date: "02-07", title: "Rose Day", subtitle: "A rose for every reason I love you", emoji: "🌹", route: "/day/1", color: "from-red-400 to-pink-500" },
  { day: 2, date: "02-08", title: "Propose Day", subtitle: "I'd choose you again, every time", emoji: "💍", route: "/day/2", color: "from-pink-400 to-rose-500" },
  { day: 3, date: "02-09", title: "Chocolate Day", subtitle: "Sweet moments, sweeter memories", emoji: "🍫", route: "/day/3", color: "from-amber-600 to-orange-400" },
  { day: 4, date: "02-09", title: "Teddy Day", subtitle: "Warm hugs across the distance", emoji: "🧸", route: "/day/4", color: "from-amber-300 to-yellow-400" },
  { day: 5, date: "02-11", title: "Promise Day", subtitle: "Words I'll keep forever", emoji: "🤝", route: "/day/5", color: "from-emerald-400 to-teal-500" },
  { day: 6, date: "02-12", title: "Hug Day", subtitle: "A hug that says everything words cannot", emoji: "🤗", route: "/day/6", color: "from-orange-300 to-amber-400" },
  { day: 7, date: "02-13", title: "Kiss Day", subtitle: "Closer than ever, even without distance", emoji: "💋", route: "/day/7", color: "from-pink-500 to-red-400" },
  { day: 8, date: "02-14", title: "Valentine's Day", subtitle: "The grand finale of my love", emoji: "❤️", route: "/day/8", color: "from-red-500 to-rose-600" },
];

export function isDayUnlocked(dayIndex: number): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dayConfig = DAYS[dayIndex];
  const [unlockMonth, unlockDay] = dayConfig.date.split("-").map(Number);

  if (month > unlockMonth) return true;
  if (month === unlockMonth && date >= unlockDay) return true;
  return false;
}

export function isTodayDay(dayIndex: number): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dayConfig = DAYS[dayIndex];
  const [unlockMonth, unlockDay] = dayConfig.date.split("-").map(Number);
  return month === unlockMonth && date === unlockDay;
}
