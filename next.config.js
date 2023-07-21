module.exports = {
    async headers() {
        return [
        {
            source: '/api/getMedicines',
            has: [
                {
                    type: 'query',
                    key: 'skip',
                    value: '0'
                }
            ],
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, s-maxage=1, stale-while-revalidate=1',
                },
            ],
        },
        {
            source: '/login',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, s-maxage=10000, stale-while-revalidate=10000',
            },
            ],
        },
        {
            source: '/dashboard',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, s-maxage=10000, stale-while-revalidate=10000',
            },
            ],
        },
        ]
    },
}