/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // 모든 경로에 대해 적용
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Credentials',
                        value: 'true',
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*', // 실제 운영 환경에서는 특정 도메인으로 변경해야 합니다
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,DELETE,PATCH,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig