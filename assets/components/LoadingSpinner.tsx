import React from 'react';

export function LoadingSpinner() {
    const style: React.CSSProperties = {
        width: 32,
        height: 32,
        display: 'inline-block',
        borderRadius: '50%',
        background:
            'conic-gradient(from 0deg, #4facfe 0%, #00f2fe 50%, #4facfe 75%, transparent 75% 100%)',
        mask:
            'radial-gradient(farthest-side, transparent calc(100% - 6px), black calc(100% - 5px))',
        WebkitMask:
            'radial-gradient(farthest-side, transparent calc(100% - 6px), black calc(100% - 5px))',
        animation: 'spin .7s linear infinite',
    };

    return (
        <>
            <div style={style} />
            <style>
                {`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}
            </style>
        </>
    );
}
