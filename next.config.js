module.exports = {
    async headers() {
        return [
        {
            source: '/api/getMedicines',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, s-maxage=100000, stale-while-revalidate=100000',
            },
            ],
        },
        ]
    },
}