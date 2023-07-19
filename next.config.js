module.exports = {
    async headers() {
        return [
        {
            source: '/medicines',
            headers: [
            {
                key: 'Cache-Control',
                value: 'public, s-maxage=10, stale-while-revalidate=10',
            },
            ],
        },
        ]
    },
}