module.exports = {
    async headers() {
        return [
        {
            source: '/api/getMedicines',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, s-maxage=604800, stale-while-revalidate=604800',
            },
            ],
        },
        ]
    },
}