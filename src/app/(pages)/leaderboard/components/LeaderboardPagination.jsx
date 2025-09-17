'use client'

import React from 'react'
import { useLeaderboardStore } from '@/store/leaderboard.store'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LeaderboardPagination = () => {
    const {
        currentPage,
        setCurrentPage,
        pagination,
        totalParticipants,
    } = useLeaderboardStore()

    const itemsPerPage = 30; // Fixed items per page
    const { totalPages } = pagination

    if (!totalPages || totalPages <= 1) return null

    const startItem = totalParticipants > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0
    const endItem = Math.min(currentPage * itemsPerPage, totalParticipants)

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages are less than or equal to maxVisiblePages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            // Calculate start and end of the middle section
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            
            // Adjust if we're near the start or end
            if (currentPage <= 3) {
                end = 4;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
            }
            
            // Add ellipsis if needed after first page
            if (start > 2) {
                pages.push('...');
            }
            
            // Add middle pages
            for (let i = start; i <= end; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }
            
            // Add ellipsis if needed before last page
            if (end < totalPages - 1) {
                pages.push('...');
            }
            
            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-neutral-900 rounded-lg p-4 border border-slate-200 dark:border-neutral-800 shadow-sm">
            <div className="flex-1 text-sm text-muted-foreground">
                Showing <span className="font-medium">{startItem}</span> to{' '}
                <span className="font-medium">{endItem}</span> of{' '}
                <span className="font-medium">{totalParticipants}</span> participants
            </div>
            
            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="hidden h-8 w-8 p-0 lg:flex"
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="h-8 w-8 p-0"
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {getPageNumbers().map((page, index) => (
                        <Button
                            key={index}
                            variant={page === currentPage ? 'default' : 'ghost'}
                            size="sm"
                            className={`h-8 w-8 p-0 ${page === '...' ? 'cursor-default' : ''}`}
                            onClick={() => typeof page === 'number' && setCurrentPage(page)}
                            disabled={page === '...'}
                        >
                            {page === '...' ? (
                                <MoreHorizontal className="h-4 w-4" />
                            ) : (
                                page
                            )}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0"
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="hidden h-8 w-8 p-0 lg:flex"
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-sm font-medium">Page {currentPage} of {totalPages}</p>
            </div>
        </div>
    )
}

export default LeaderboardPagination
