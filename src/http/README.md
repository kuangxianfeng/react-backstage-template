## 引入路径

```ts
import { httpInstance } from '@/http'
```

## 功能清单

### 自动全局 `Loading`

> 请求前全局`loading`，可通过 `_loading` 来关闭此特性，可通过 `_loadingText` 自定义此次请求文案，默认是`加载中···`

```ts
httpInstance.get('', {
    _loading: true,
    _loadingText:"已经很快了···"
})
```

### 超时重发

> 默认会重发三次，默认是0，最大值是 `http/config.ts` 中的 `MAX_RESEND_TIMES` 控制，意味着超时之后会重新发送三次，可通过 `_currentRequestMaxResendTimes` 覆盖。

```ts
httpInstance.get('', {
    _currentRequestMaxResendTimes: 1, // 重发一次
})
// 或者是
httpInstance.post('',{},{
        _currentRequestMaxResendTimes: 1
    }
)
```

### 返回数据类型定义

> `httInstance.get<unknown,UserInfo>` 是固定结构

```ts
type UserInfo={
    name:string
    age:number
}
httInstance.get<unknown,UserInfo>("/getUserInfo").then(res=>{
    const { name,age }=res.data // 自动识别 name 为 string，age 为 number
})
```

### 取消重复请求

> 以第一次发出的请求为基准，利用浏览器自带的 `AbortController` 实现，可以通过 `_bypassRepeatDetection` 或者 `/http/config.ts` 中的 `REPEAT_REQUEST_WHITE_LIST` 来设置不做白名单校验，通过 `url` 来匹配是否命中

```ts
httpInstance.get("/getUserInfo", {_bypassRepeatDetection:true})
// 或者是设置REPEAT_REQUEST_WHITE_LIST
REPEAT_REQUEST_WHITE_LIST=['/getUserInfo']
```

### 自定义处理数据结构

> 分三个权重，依次为 `_customResponse` `_lowCustomResponse` `_targetedCustomResponse`

#### `_customResponse`

> 直接返回数据结构，不做任何处理，在 `then` 回调中处理

#### `_lowCustomResponse` 与 `_targetedCustomResponse`

> 这两者唯一的区别是 `_targetedCustomResponse` 是`number[]`，可单独对某个 `code` 码进行处理，都是在 `catch` 回调中处理。

```ts
httpInstance.get('', {
    _targetedCustomResponse: [1000,2000]
}).catch((error:AxiosResponse<API.BaseDataStructure>)=>{
    // 此时的 error.data.code===1000|2000
    // 需要注意的是有可能其他情况也会进入，比如timeout等等，所以要做好区分
})
```