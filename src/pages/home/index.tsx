import { useRoute } from "@/hooks"
import React, { FC } from "react"
import { matchRoutes } from "react-router-dom"

const Home: FC = () => {
    const { location } = useRoute()
    return <div style={{ height: 3000 }}>home</div>
}

export default Home
