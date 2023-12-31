import Mock from 'mockjs'

const AllList = []
for (let i = 0; i < 50; i++) {
    AllList.push(Mock.mock({
        id: '@id',
        title: '@ctitle(10, 20)'
    }))
}

export default [
    {
        url: '/mock/page/list',
        method: 'get',
        response: option => {
            let { title, from, limit } = option.query
            from = ~~from
            limit = ~~limit
            let list = AllList.filter(item => {
                return title ? item.title.includes(title) : true
            })
            let pageList = list.filter((item, index) => {
                return index >= from && index < (from + limit)
            })
            return {
                error: '',
                status: 1,
                data: {
                    list: pageList,
                    total: list.length
                }
            }
        }
    },
    {
        url: '/mock/page/detail',
        method: 'get',
        response: option => {
            let info = AllList.filter(item => item.id == option.query.id)
            return {
                error: '',
                status: 1,
                data: info[0]
            }
        }
    },
    {
        url: '/mock/page/create',
        method: 'post',
        response: {
            error: '',
            status: 1,
            data: {
                isSuccess: true
            }
        }
    },
    {
        url: '/mock/page/edit',
        method: 'post',
        response: {
            error: '',
            status: 1,
            data: {
                isSuccess: true
            }
        }
    },
    {
        url: '/mock/page/delete',
        method: 'post',
        response: {
            error: '',
            status: 1,
            data: {
                isSuccess: true
            }
        }
    }
]
