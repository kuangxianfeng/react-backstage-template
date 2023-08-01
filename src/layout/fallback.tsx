import React from 'react'
import { Spin } from 'antd'
import type { FC } from 'react'

const Fallback: FC = () => (
    <div className="ver-flex-center full">
        <Spin />
    </div>
)

export default Fallback