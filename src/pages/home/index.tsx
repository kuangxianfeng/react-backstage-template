import React, { FC, useState, useTransition,useEffect } from "react"
import { Spin } from "antd"
const Home: FC = () => {
    const [isPending, startTransition] = useTransition()
    const [count, setCount] = useState(0)
    useEffect(()=>{
        console.log(isPending);
    },[isPending])
    function handleClick() {
        startTransition(() => {
            setCount(c => c + 1)
        })
    }

    return (
        <div>
            {isPending && <Spin />}
            <button onClick={handleClick}>{count}</button>
        </div>
    )
}

export default Home
