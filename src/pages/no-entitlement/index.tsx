import React, { FC } from "react"
import { Result, Button, Space } from "antd"
import { useRoute } from "@/hooks"

const NoEntitlement: FC = () => {
    const { navigate } = useRoute()
    return (
        <Result
            status="403"
            title="403"
            subTitle="无法访问"
            extra={
                <Space>
                    <Button type="primary" onClick={() => navigate("/")}>
                        首页
                    </Button>
                    <Button
                        onClick={() =>
                            navigate("/login", {
                                replace: true
                            })
                        }
                    >
                        返回登录
                    </Button>
                </Space>
            }
        />
    )
}

export default NoEntitlement
