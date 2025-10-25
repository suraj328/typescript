# 1. Create a new Next.js app with TypeScript and the App Router
npx create-next-app@latest my-fullstack-app --typescript --eslint --app
cd my-fullstack-app

# 2. Install all required dependencies
# Tailwind: tailwindcss, @tailwindcss/postcss, postcss (required for build)
# Chakra UI: @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion (required peer dependencies)
# Redux Toolkit: @reduxjs/toolkit, react-redux
npm install tailwindcss @tailwindcss/postcss postcss @chakra-ui/react @emotion/react @emotion/styled framer-motion @reduxjs/toolkit react-redux

# 3. Initialize Tailwind Config files (creates tailwind.config.js and postcss.config.js)
npx tailwindcss init -p

# TROUBLESHOOTING: If the above command fails with "could not determine executable to run," try this alternative:
# ./node_modules/.bin/tailwindcss init -p