import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PrTable = ({ prs, labelStats }) => {
    return (
        <div className="overflow-x-auto border border-gray-200 dark:border-neutral-700 rounded-lg">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Labels</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Merged At</TableHead>
                        <TableHead>PR Link</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {prs.map((pr, index) => (
                        <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-neutral-700">
                            <TableCell className="max-w-xs truncate">{pr.title}</TableCell>
                            <TableCell>{pr.points}</TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 text-xs rounded-full font-medium ${pr.status === "valid"
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-violet-900/30 dark:text-violet-300"
                                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                        }`}
                                >
                                    {pr.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                {pr.labels.map((label, idx) => (
                                    <span
                                        key={idx}
                                        className="mr-1 px-2 py-0.5 text-xs bg-slate-100 dark:bg-neutral-700 rounded-full"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </TableCell>
                            <TableCell>{new Date(pr.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                {pr.mergedAt ? new Date(pr.mergedAt).toLocaleDateString() : "-"}
                            </TableCell>
                            <TableCell>
                                <a
                                    href={pr.prLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-600 dark:text-violet-400 hover:underline text-sm"
                                >
                                    View PR
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PrTable;
