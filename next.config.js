/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        ppr:true
    },
    images: {
        remotePatterns:[
            {
                hostname:"**"
            }
        ]
    },
};

module.exports = nextConfig;
