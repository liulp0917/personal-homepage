'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { CardItem } from '@/types/page';
import { useMessages } from '@/lib/i18n/useMessages';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-0">{children}</p>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10"
        />
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
};

interface SelectedProjectsProps {
    items: CardItem[];
    title?: string;
    enableOnePageMode?: boolean;
    target?: string;
}

export default function SelectedProjects({ items, title, enableOnePageMode = false, target = 'projects' }: SelectedProjectsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedProjects;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? `/#${target}` : `/${target}`}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    {messages.home.viewAll} →
                </Link>
            </div>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <motion.div
                        key={`${item.title}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                        <div className="flex justify-between items-start mb-1 gap-2">
                            <h3 className="font-semibold text-primary leading-tight">
                                {item.link ? (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                        {item.title}
                                    </a>
                                ) : (
                                    item.title
                                )}
                            </h3>
                            {item.date && (
                                <span className="text-xs text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded shrink-0">
                                    {item.date}
                                </span>
                            )}
                        </div>
                        {item.subtitle && (
                            <p className="text-sm text-accent font-medium mb-2">{item.subtitle}</p>
                        )}
                        {item.content && (
                            <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
                                <ReactMarkdown components={markdownComponents}>
                                    {item.content}
                                </ReactMarkdown>
                            </div>
                        )}
                        {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs text-primary bg-accent/10 px-2 py-1 rounded border border-accent/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
