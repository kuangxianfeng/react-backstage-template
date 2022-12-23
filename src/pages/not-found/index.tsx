import React, { FC } from "react"
import { Result, Button, Space } from "antd"
import { useRoute } from "@/hooks"

const NotFound: FC = () => {
    const { navigate } = useRoute()
    return (
        <Result
            status="404"
            title="404"
            subTitle="页面丢失啦···"
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

export default NotFound
