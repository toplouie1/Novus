import { useEffect, useCallback } from "react";

export const useInfiniteScroll = (onLoadMore, hasMore, loading) => {
	const handleScroll = useCallback(() => {
		if (loading || !hasMore) return;

		const scrollPosition = window.innerHeight + window.pageYOffset;
		const threshold = document.documentElement.offsetHeight - 1000;

		if (scrollPosition > threshold) {
			onLoadMore();
		}
	}, [loading, hasMore, onLoadMore]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);
};
