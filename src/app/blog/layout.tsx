import React from 'react';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex flex-col items-center min-h-[100dvh] divide-y">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </main>
    );
}