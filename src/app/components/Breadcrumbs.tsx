'use client';

import Link from 'next/link';

interface Crumb {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <div className="text-sm breadcrumbs mb-4 font-light">
            <ul>
                {items.map((item, i) => (
                    <li key={i}>
                        {item.href ? (
                            <Link href={item.href}>{item.label}</Link>
                        ) : (
                            <span className="text-neutral font-bold">{item.label}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
