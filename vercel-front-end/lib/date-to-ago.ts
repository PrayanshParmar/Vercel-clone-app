export function convertToDaysAgo(dateString: string): string {
    const date: Date = new Date(dateString);
    const currentDate: Date = new Date();
    const differenceMs: number = currentDate.getTime() - date.getTime();

    // Convert milliseconds to seconds
    const secondsAgo: number = Math.floor(differenceMs / 1000);

    if (secondsAgo < 60) {
        return "Just now";
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo}m ago`;
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo}h ago`;
    } else {
        const daysAgo = Math.floor(secondsAgo / 86400);
        return `${daysAgo}d ago`;
    }
}