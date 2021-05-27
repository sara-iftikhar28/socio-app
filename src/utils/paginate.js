import _ from 'lodash'

export function paginate(items, pageNumber, pageSize){
    const startIndex= (pageNumber - 1) * pageSize
    //_.slice(items, startIndex)
    //._take()
    return _(items).splice(startIndex).take(pageSize).value()
}

