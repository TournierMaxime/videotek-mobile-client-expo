import { useState } from 'react';

export default function useLoadMore(page, totalPage) {
    const [currentPage, setCurrentPage] = useState(1)

    const loadMore = () => {
        if (page < totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    return { currentPage, loadMore }
}