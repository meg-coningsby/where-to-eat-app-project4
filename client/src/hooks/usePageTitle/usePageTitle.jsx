import { useEffect } from 'react';

// Custom hook for setting the page title
export function usePageTitle(title) {
    useEffect(() => {
        const baseTitle = 'Where To Eat';
        document.title = `${title} | ${baseTitle}`;
    }, [title]);
}
