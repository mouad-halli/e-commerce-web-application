import dotenv from 'dotenv'
dotenv.config()

const PORT: number = Number(process.env.PORT || 8000)

const DB_LINK: string = String(process.env.DB_LINK)

// Front end
const CLIENT_URL: string = String(process.env.FRONT_END_URL)

// Back end
const SERVER_URL: string = String(process.env.BACK_END_URL)

export {
    PORT, DB_LINK, CLIENT_URL, SERVER_URL
}