'use client';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import projectsData from "@/lib/Projects.json";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const Projects = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        // Calculate total pages
        const total = Math.ceil(projectsData.length / ITEMS_PER_PAGE);
        setTotalPages(total);

        // Get current items
        const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
        const items = projectsData.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(items);
    }, [currentPage, projectsData]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5; // Maximum number of page buttons to show
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Add first page
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-1 rounded-md"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(<span key="start-ellipsis" className="px-2">...</span>);
            }
        }

        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-md ${currentPage === i
                        ? 'bg-emerald-600 text-white dark:bg-violet-600'
                        : 'hover:bg-slate-100 dark:hover:bg-neutral-800'}`}
                >
                    {i}
                </button>
            );
        }

        // Add last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="end-ellipsis" className="px-2">...</span>);
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-1 rounded-md"
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="space-y-6">
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {currentItems.map((project) => (
                    <ProjectCard key={project['Project name']} project={project} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-neutral-800">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        Showing <span className="font-medium">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, projectsData.length)}</span> to{' '}
                        <span className="font-medium">
                            {Math.min(currentPage * ITEMS_PER_PAGE, projectsData.length)}
                        </span>{' '}
                        of <span className="font-medium">{projectsData.length}</span> projects
                    </div>

                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-neutral-800"
                            aria-label="First page"
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-neutral-800"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <div className="flex items-center space-x-1 mx-2">
                            {renderPagination()}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-neutral-800"
                            aria-label="Next page"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-neutral-800"
                            aria-label="Last page"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
